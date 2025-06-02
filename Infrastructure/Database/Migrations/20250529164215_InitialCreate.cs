using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
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
                    naam = table.Column<string>(type: "text", nullable: true)
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
                    bedrag = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: true),
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
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "wedstrijd_categorie_deelnemer",
                schema: "knwu",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    knwu_id = table.Column<string>(type: "text", nullable: true),
                    uci_id = table.Column<string>(type: "text", nullable: true),
                    startnummer = table.Column<short>(type: "smallint", nullable: false),
                    categorie_id = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_wedstrijd_categorie_deelnemer", x => x.id);
                    table.ForeignKey(
                        name: "fk_wedstrijd_categorie_deelnemer_wedstrijd_categorie_categorie",
                        column: x => x.categorie_id,
                        principalSchema: "knwu",
                        principalTable: "wedstrijd_categorie",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_wedstrijd_categorie_knwu_wedstrijd_id",
                schema: "knwu",
                table: "wedstrijd_categorie",
                column: "knwu_wedstrijd_id");

            migrationBuilder.CreateIndex(
                name: "ix_wedstrijd_categorie_deelnemer_categorie_id",
                schema: "knwu",
                table: "wedstrijd_categorie_deelnemer",
                column: "categorie_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "wedstrijd_categorie_deelnemer",
                schema: "knwu");

            migrationBuilder.DropTable(
                name: "wedstrijd_categorie",
                schema: "knwu");

            migrationBuilder.DropTable(
                name: "wedstrijd",
                schema: "knwu");

            migrationBuilder.DropTable(
                name: "evenement",
                schema: "club");
        }
    }
}
