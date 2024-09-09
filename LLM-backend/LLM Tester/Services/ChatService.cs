namespace LLM_Tester.Services;
public interface IChatService
{
    Dictionary<int, string> GetChatHistory();
    void AddMessageToHistory(string message);
}

public class ChatService : IChatService
{
    private Dictionary<int, string> _chatHistory = [];

    public Dictionary<int, string> GetChatHistory()
    {
        return _chatHistory;
    }

    public void AddMessageToHistory(string message)
    {
        int newId = _chatHistory.Count + 1;
        _chatHistory.Add(newId, message);
    }
}