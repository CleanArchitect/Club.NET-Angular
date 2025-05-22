using Clean.Net;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Application.Api;

[ApiController]
[Route("api/knwu/wedstrijden/{wedstrijdId:guid}/[controller]")]
public sealed class DeelnemersController(IInputHandler handler) : CleanController
{
    [HttpPost]
    public async Task<ActionResult<CreateKnwuWedstrijdDeelnemerOutput>> Create(Guid wedstrijdId, CreateKnwuWedstrijdDeelnemerInput input) =>
        CreatedOutputAt(nameof(Get), await handler.HandleAsync(input), ("wedstrijdId", wedstrijdId));

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<GetKnwuWedstrijdDeelnemerOutput>> Get(Guid id) =>
        Ok(await handler.HandleAsync(new GetKnwuWedstrijdDeelnemerInput(id)));

    [HttpPatch("{id:guid}")]
    public async Task<ActionResult<UpdateKnwuWedstrijdDeelnemerStartnummerOutput>> UpdateStartnummer(Guid wedstrijdId, Guid id, UpdateKnwuWedstrijdDeelnemerStartnummerInput input) =>
        Ok(await handler.HandleAsync(input.SetId(id, wedstrijdId)));
}