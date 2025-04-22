using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data;

/// <inheritdoc />
internal partial class Initial : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.EnsureSchema(
            name: "club");

        migrationBuilder.EnsureSchema(
            name: "knwu");

        migrationBuilder.CreateTable(
            name: "evenement",
            schema: "club",
            columns: table => new
            {
                id = table.Column<Guid>(type: "uuid", nullable: false),
                datum = table.Column<DateOnly>(type: "date", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_evenement", x => x.id);
            });

        migrationBuilder.CreateTable(
            name: "wedstrijd",
            schema: "knwu",
            columns: table => new
            {
                id = table.Column<Guid>(type: "uuid", nullable: false),
                knwu_wedstrijdnummer = table.Column<string>(type: "text", nullable: true),
                naam = table.Column<string>(type: "text", nullable: true),
                bedrag = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_wedstrijd", x => x.id);
                table.ForeignKey(
                    name: "fk_wedstrijd_evenement_id",
                    column: x => x.id,
                    principalSchema: "club",
                    principalTable: "evenement",
                    principalColumn: "id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateTable(
            name: "wedstrijd_categorie",
            schema: "knwu",
            columns: table => new
            {
                id = table.Column<Guid>(type: "uuid", nullable: false),
                naam = table.Column<string>(type: "text", nullable: true),
                startnummers = table.Column<short[]>(type: "smallint[]", nullable: true),
                knwu_wedstrijd_id = table.Column<Guid>(type: "uuid", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("pk_wedstrijd_categorie", x => x.id);
                table.ForeignKey(
                    name: "fk_wedstrijd_categorie_knwu_wedstrijden_knwu_wedstrijd_id",
                    column: x => x.knwu_wedstrijd_id,
                    principalSchema: "knwu",
                    principalTable: "wedstrijd",
                    principalColumn: "id");
            });

        migrationBuilder.CreateTable(
            name: "wedstrijd_deelnemer",
            schema: "knwu",
            columns: table => new
            {
                id = table.Column<Guid>(type: "uuid", nullable: false),
                knwu_id = table.Column<string>(type: "text", nullable: true),
                uci_id = table.Column<string>(type: "text", nullable: true),
                startnummer = table.Column<short>(type: "smallint", nullable: false),
                knwu_wedstrijd_id = table.Column<Guid>(type: "uuid", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("pk_wedstrijd_deelnemer", x => x.id);
                table.ForeignKey(
                    name: "fk_wedstrijd_deelnemer_knwu_wedstrijden_knwu_wedstrijd_id",
                    column: x => x.knwu_wedstrijd_id,
                    principalSchema: "knwu",
                    principalTable: "wedstrijd",
                    principalColumn: "id");
            });

        migrationBuilder.CreateIndex(
            name: "ix_wedstrijd_categorie_knwu_wedstrijd_id",
            schema: "knwu",
            table: "wedstrijd_categorie",
            column: "knwu_wedstrijd_id");

        migrationBuilder.CreateIndex(
            name: "ix_wedstrijd_deelnemer_knwu_wedstrijd_id",
            schema: "knwu",
            table: "wedstrijd_deelnemer",
            column: "knwu_wedstrijd_id");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "wedstrijd_categorie",
            schema: "knwu");

        migrationBuilder.DropTable(
            name: "wedstrijd_deelnemer",
            schema: "knwu");

        migrationBuilder.DropTable(
            name: "wedstrijd",
            schema: "knwu");

        migrationBuilder.DropTable(
            name: "evenement",
            schema: "club");
    }
}
