using Clean.Net;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Application;

[ApiController]
[Route("api/knwu/[controller]")]
public sealed class WedstrijdController(IInputHandler handler) : CleanController
{
    [HttpPost]
    public async Task<ActionResult<CreateKnwuWedstrijdOutput>> Create(CreateKnwuWedstrijdInput input) =>
        CreatedOutputAt(nameof(Get), await handler.HandleAsync(input));

    [HttpGet("overzicht")]
    public async Task<ActionResult<GetAllKnwuWedstrijdenOuput>> GetAll() =>
        Ok(await handler.HandleAsync(new GetAllKnwuWedstrijdenInput()));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetKnwuWedstrijdOutput>> Get(Guid id) =>
        Ok(await handler.HandleAsync(new GetKnwuWedstrijdInput(id)));

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id) =>
        NoContentOutput(await handler.HandleAsync(new DeleteKnwuWedstrijdInput(id)));
}