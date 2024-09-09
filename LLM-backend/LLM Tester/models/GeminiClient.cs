using System.Runtime.Serialization.Json;
using System.Text;
using System.Text.Json;
using LLM_Tester.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace LLM_Tester.models;

public sealed class GeminiClient
{
    private readonly IChatService _chatService;
    private readonly HttpClient _httpClient;
    private readonly ILogger<GeminiClient> _logger;
    private readonly JsonSerializerSettings _serializerSettings = new()
    {
        ContractResolver = new DefaultContractResolver
        {
            NamingStrategy = new SnakeCaseNamingStrategy()
        }
    };

    public GeminiClient(HttpClient httpClient, ILogger<GeminiClient> logger, IChatService chatService)
    {
        _httpClient = httpClient;
        _logger = logger;
        _chatService = chatService;
    }

    public async Task<string> GenerateContentAsync(string prompt, CancellationToken cancellationToken)
    {
        var requestBody = GeminiRequestFactory.CreateRequest(prompt);
        var content = new StringContent(JsonConvert.SerializeObject(requestBody, Formatting.None, _serializerSettings), Encoding.UTF8, "application/json");

        try 
        {
            var response = await _httpClient.PostAsync("", content, cancellationToken);
             response.EnsureSuccessStatusCode();

        var responseBody = await response.Content.ReadAsStringAsync();

        var geminiResponse = JsonConvert.DeserializeObject<GeminiResponse>(responseBody);
        var geminiResponseText = geminiResponse?.Candidates[0].Content.Parts[0].Text;

        return geminiResponseText;


        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating content from Gemini API.");
            throw;
        }
        
    }

}