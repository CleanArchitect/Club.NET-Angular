using Clean.Net;
using Microsoft.AspNetCore.Cors.Infrastructure;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Application;

internal sealed class AppSettings : Settings
{
    [Required]
    public string Connectionstring { get; private set; }

    public string DefaultPolicyName => Cors.FirstOrDefault().Key;

    public IReadOnlyCollection<CorsSettings> CorsSettings => Cors?
        .Select(keyValuePair => new CorsSettings(keyValuePair.Key, keyValuePair.Value))
        .ToList()
        .AsReadOnly();

    private Dictionary<string, string[]> Cors { get; set; }
}

internal sealed class CorsSettings(string name, string[] origins)
{
    public string Name { get; private set; } = name;

    public Action<CorsPolicyBuilder> Policy => builder => builder
        .WithOrigins(origins)
        .AllowAnyMethod()
        .AllowAnyHeader();
}
