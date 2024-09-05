import { useEffect, useRef, useState } from "react";
import { Essay as EssayType } from "../types";
import { getParagraphsWithCorrections } from "../utils/getParagraphsWithCorrections";
import {
  deleteCorrection,
  postCorrection,
  putCorrection,
} from "../api/correction";

type UserSelection = {
  paragraphNumber: number;
  start: number;
  end: number;
  selectedText: string;
};

type EssayProps = {
  essay: EssayType;
  isEditable?: boolean;
  showWrongText?: boolean;
  showCorrectedEssay?: boolean;
};

export const Essay = ({
  essay,
  isEditable = false,
  showWrongText = false,
  showCorrectedEssay = false,
}: EssayProps) => {
  const [selection, setSelection] = useState<UserSelection | null>(null);
  const [correctedText, setCorrectedText] = useState("");
  const [comment, setComment] = useState("");
  const [corrections, setCorrections] = useState(essay.corrections || []);
  const [operation, setOperation] = useState("");

  const correctionInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (correctionInputRef.current) {
      correctionInputRef.current.focus();
      if (correctionInputRef.current.value.length > 0) {
        correctionInputRef.current.setSelectionRange(
          correctedText.length,
          correctedText.length
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  const paragraphsWithCorrections = getParagraphsWithCorrections(
    essay.essayText,
    corrections
  );

  function wrapSelection(selection: Selection) {
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.cursor = "pointer";
    span.id = "temp-selection";
    span.appendChild(range.extractContents());
    range.insertNode(span);
    return span;
  }

  function unwrapSpan() {
    const span = document.querySelector("span#temp-selection");

    if (!span) return;
    const parent = span.parentNode as HTMLParagraphElement;
    while (span.firstChild) {
      parent.insertBefore(span.firstChild, span);
    }
    parent.removeChild(span);
  }

  const handleMouseUp = (paragraphNumber: number) => {
    if (!isEditable) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const { anchorOffset, focusOffset } = selection;
    let start = Math.min(anchorOffset, focusOffset);
    let end = Math.max(anchorOffset, focusOffset);
    const previousSibling = selection.anchorNode
      ?.previousSibling as HTMLElement | null;
    const previousSiblingEnd = previousSibling?.dataset?.end;
    if (previousSiblingEnd) {
      start += Number(previousSiblingEnd);
      end += Number(previousSiblingEnd);
    }
    const selectedText = selection.toString();

    const addSelection = () => {
      setOperation("Add");
      setSelection({
        paragraphNumber,
        start,
        end,
        selectedText,
      });
    };

    const span = wrapSelection(selection);
    span.addEventListener("click", addSelection);

    window.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          addSelection();
        }
      },
      { once: true }
    );
  };

  const resetCorrection = () => {
    setSelection(null);
    setCorrectedText("");
    setComment("");
    unwrapSpan();
  };

  const saveCorrection = () => {
    if ((!comment && !correctedText) || !selection) return;

    const { paragraphNumber } = selection;

    const existingCorrection = corrections.find(
      (c) =>
        c.paragraphNumber === paragraphNumber &&
        c.startIndex === selection.start &&
        c.endIndex === selection.end
    );

    if (existingCorrection) {
      updateCorrection();
    } else {
      addCorrection();
    }
  };

  const addCorrection = async () => {
    if ((!comment && !correctedText) || !selection) return;

    const { paragraphNumber } = selection;
    const newCorrection = {
      paragraphNumber,
      startIndex: selection.start,
      endIndex: selection.end,
      correctedText,
      comment,
      essayId: essay.id,
    };
    const temperaryId = Math.random();
    const newCorrections = [
      ...corrections,
      {
        id: temperaryId,
        ...newCorrection,
      },
    ];

    setCorrections(newCorrections);
    const { id } = (await postCorrection(newCorrection)) as { id: number };
    const updatedCorrections = newCorrections.map((c) =>
      c.id === temperaryId ? { ...c, id } : c
    );
    setCorrections(updatedCorrections);
    resetCorrection();
  };

  const updateCorrection = () => {
    if ((!comment && !correctedText) || !selection) return;

    const { paragraphNumber } = selection;
    let correctionId = -1;

    const newCorrections = corrections.map((c) => {
      if (
        c.paragraphNumber === paragraphNumber &&
        c.startIndex === selection.start &&
        c.endIndex === selection.end
      ) {
        correctionId = c.id;
        return {
          ...c,
          correctedText,
          comment,
        };
      }
      return c;
    });

    setCorrections(newCorrections);
    putCorrection({ id: correctionId, correctedText, comment });
    resetCorrection();
  };

  const removeCorrection = () => {
    if (!selection) return;

    const correctionToDelete = corrections.find(
      (c) =>
        c.paragraphNumber === selection.paragraphNumber &&
        c.startIndex === selection.start &&
        c.endIndex === selection.end
    );
    if (!correctionToDelete) return;

    const newCorrections = corrections.filter(
      (c) => c.id !== correctionToDelete?.id
    );
    setCorrections(newCorrections);
    deleteCorrection(correctionToDelete.id);
    resetCorrection();
  };

  const cancelCorrection = () => {
    resetCorrection();
  };

  return (
    <div>
      <h3 className="primary-text">Question</h3>
      <p>{essay.question}</p>
      <h3 className="primary-text">Essay</h3>
      <div className="essay-body-overlay">
        <div className="essay-body-corrected">
          {paragraphsWithCorrections.map((paragraph, paragraphIndex) => (
            <p
              key={paragraphIndex}
              onClick={() => handleMouseUp(paragraphIndex)}
            >
              {paragraph.map((section, index) => {
                if (
                  section.isCorrection &&
                  (showWrongText || showCorrectedEssay)
                ) {
                  return (
                    <span
                      key={index}
                      data-end={section.endIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isEditable) return;
                        setSelection({
                          paragraphNumber: paragraphIndex,
                          start: section.startIndex,
                          end: section.endIndex,
                          selectedText: section.text,
                        });
                        setCorrectedText(section.correctedText || "");
                        setComment(section.comment || "");
                        setOperation("Edit");
                      }}
                      className={isEditable ? "pointer" : ""}
                    >
                      <mark>{section.text}</mark>
                      {showCorrectedEssay && section.correctedText && (
                        <span className="corrected-text">
                          {section.correctedText}
                        </span>
                      )}
                      {showCorrectedEssay && section.comment && (
                        <span className="comment">({section.comment})</span>
                      )}
                    </span>
                  );
                }
                return section.text;
              })}
            </p>
          ))}
        </div>
      </div>

      {selection && (
        <dialog open>
          <p>{selection.selectedText}</p>
          <textarea
            placeholder="Corrected text"
            value={correctedText}
            onChange={(event) => setCorrectedText(event.target.value)}
            ref={correctionInputRef}
          />
          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <div>
            <button className="save-button" onClick={saveCorrection}>
              Save
            </button>
            {operation === "Edit" && (
              <button className="remove-button" onClick={removeCorrection}>
                Remove
              </button>
            )}
            <button className="cancel-button" onClick={cancelCorrection}>
              Cancel
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};
