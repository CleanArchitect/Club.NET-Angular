using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data
{
    /// <inheritdoc />
    public partial class WedstrijdAddedCascading : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_wedstrijd_categorie_knwu_wedstrijden_knwu_wedstrijd_id",
                schema: "knwu",
                table: "wedstrijd_categorie");

            migrationBuilder.DropForeignKey(
                name: "fk_wedstrijd_deelnemer_knwu_wedstrijden_knwu_wedstrijd_id",
                schema: "knwu",
                table: "wedstrijd_deelnemer");

            migrationBuilder.AddForeignKey(
                name: "fk_wedstrijd_categorie_knwu_wedstrijden_knwu_wedstrijd_id",
                schema: "knwu",
                table: "wedstrijd_categorie",
                column: "knwu_wedstrijd_id",
                principalSchema: "knwu",
                principalTable: "wedstrijd",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_wedstrijd_deelnemer_knwu_wedstrijden_knwu_wedstrijd_id",
                schema: "knwu",
                table: "wedstrijd_deelnemer",
                column: "knwu_wedstrijd_id",
                principalSchema: "knwu",
                principalTable: "wedstrijd",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_wedstrijd_categorie_knwu_wedstrijden_knwu_wedstrijd_id",
                schema: "knwu",
                table: "wedstrijd_categorie");

            migrationBuilder.DropForeignKey(
                name: "fk_wedstrijd_deelnemer_knwu_wedstrijden_knwu_wedstrijd_id",
                schema: "knwu",
                table: "wedstrijd_deelnemer");

            migrationBuilder.AddForeignKey(
                name: "fk_wedstrijd_categorie_knwu_wedstrijden_knwu_wedstrijd_id",
                schema: "knwu",
                table: "wedstrijd_categorie",
                column: "knwu_wedstrijd_id",
                principalSchema: "knwu",
                principalTable: "wedstrijd",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_wedstrijd_deelnemer_knwu_wedstrijden_knwu_wedstrijd_id",
                schema: "knwu",
                table: "wedstrijd_deelnemer",
                column: "knwu_wedstrijd_id",
                principalSchema: "knwu",
                principalTable: "wedstrijd",
                principalColumn: "id");
        }
    }
}
