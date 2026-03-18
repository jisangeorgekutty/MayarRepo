using System;

namespace Mayar.Api.Common;

public class SlugGenerator
{
    public static string GenerateSlug(string phrase)
    {
        if (string.IsNullOrWhiteSpace(phrase))
            return string.Empty;

        // Convert to lower case
        string str = phrase.ToLowerInvariant();
        // Replace spaces with hyphens
        str = System.Text.RegularExpressions.Regex.Replace(str, @"\s", "-");
        // Remove invalid characters
        str = System.Text.RegularExpressions.Regex.Replace(str, @"[^a-z0-9\-]", "");
        // Remove multiple hyphens
        str = System.Text.RegularExpressions.Regex.Replace(str, @"-+", "-").Trim('-');

        return str;
    }
}
