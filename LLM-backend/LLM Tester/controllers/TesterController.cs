using Microsoft.AspNetCore.Mvc;
using LLM_Tester.models; // Update to match the namespace of GeminiClient
using System.Threading.Tasks;
using System.Threading;

namespace LLM_Tester.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeminiController : ControllerBase
    {
        internal readonly GeminiClient _geminiClient;
        private readonly ILogger<GeminiController> _logger; 

        public GeminiController(GeminiClient geminiClient, ILogger<GeminiController> logger)
        {
            _geminiClient = geminiClient ?? throw new ArgumentNullException(nameof(geminiClient));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateContent([FromBody] string prompt, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(prompt))
            {
                return BadRequest("Prompt cannot be null or empty.");
            }

            try
            {
                var result = await _geminiClient.GenerateContentAsync(prompt, cancellationToken);
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError(ex, "Error generating content from Gemini API.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}
