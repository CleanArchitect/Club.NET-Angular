using Clean.Core;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Application.Api;

[ApiController]
[Route("api/knwu/[controller]")]
public sealed class WedstrijdenController(IInputHandler handler) : CleanController
{
    [HttpPost]
    public async Task<ActionResult<CreateKnwuWedstrijdOutput>> Create(CreateKnwuWedstrijdInput input) =>
        CreatedAtAction(nameof(Get), await handler.HandleAsync(input), ("id", x => x.Id));

    [HttpGet]
    public async Task<ActionResult<GetAllKnwuWedstrijdenOuput>> GetAll() =>
        Ok(await handler.HandleAsync(new GetAllKnwuWedstrijdenInput()));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetKnwuWedstrijdOutput>> Get(Guid id) =>
        Ok(await handler.HandleAsync(new GetKnwuWedstrijdInput(id)));

    [HttpGet("{id:guid}/export")]
    public async Task<FileResult> Export(Guid id) =>
        File(await handler.HandleAsync(new ExportExcelKnwuWedstrijdInput(id)) as IFileOutput);

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id) =>
        NoContent(await handler.HandleAsync(new DeleteKnwuWedstrijdInput(id)));
}