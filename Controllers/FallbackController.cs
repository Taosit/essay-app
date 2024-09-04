using Microsoft.AspNetCore.Mvc;

namespace essay_app_c_sharp.Controllers
{
    public class FallbackController: Controller
    {
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
        }
    }
}