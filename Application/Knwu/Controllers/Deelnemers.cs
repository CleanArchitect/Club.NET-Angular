using Clean.Net;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Application;

[ApiController]
[Route("api/knwu/wedstrijd/[controller]")]
public sealed class DeelnemerController(IInputHandler handler) : CleanController
{
    [HttpPost]
    public async Task<ActionResult<CreateKnwuWedstrijdCategorieDeelnemerOutput>> Create(CreateKnwuWedstrijdCategorieDeelnemerInput input) =>
        CreatedOutputAt(nameof(Get), await handler.HandleAsync(input));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetKnwuWedstrijdDeelnemerOutput>> Get(Guid id) =>
        Ok(await handler.HandleAsync(new GetKnwuWedstrijdDeelnemerInput(id)));

    [HttpPatch("{id:guid}")]
    public async Task<ActionResult<UpdateKnwuWedstrijdCategorieDeelnemerStartnummerOutput>> UpdateStartnummer(Guid id) =>
        Ok(await handler.HandleAsync(new UpdateKnwuWedstrijdCategorieDeelnemerStartnummerInput(id)));
}