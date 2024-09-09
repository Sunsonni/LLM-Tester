using LLM_Tester.Services;
using Microsoft.AspNetCore.Mvc;


namespace LLM_Tester.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;

    public ChatController(IChatService chatService)
    {
        _chatService = chatService;
    }

    [HttpGet("history")]
    public IActionResult GetChatHistory()
    {
        var chatHistory = _chatService.GetChatHistory();
        return Ok(chatHistory);
    }

    [HttpPost("send")]
    public IActionResult SendChatMessage([FromBody] string userMessage)
    {
        _chatService.AddMessageToHistory(userMessage);
        return Ok("Message added to chat history");
    }
}


