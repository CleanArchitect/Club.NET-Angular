using Clean.Net;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Application;

[ApiController]
[Route("api/knwu/wedstrijd/{wedstrijdId:guid}/[controller]")]
public sealed class CategorieController(IInputHandler handler) : CleanController
{
    [HttpGet("{categorieId:guid}/export")]
    public async Task<FileResult> Export(Guid wedstrijdId, Guid categorieId) =>
        FileOutput(await handler.HandleAsync(new ExportExcelKnwuWedstrijdInput(wedstrijdId, categorieId)));
}