using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebTemplate.Migrations
{
    /// <inheritdoc />
    public partial class V1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Biblioteke",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Biblioteke", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Police",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Oznaka = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    maksimalnoKnjiga = table.Column<long>(type: "bigint", nullable: false),
                    trenutnoKnjiga = table.Column<long>(type: "bigint", nullable: false),
                    policaBibliotekaID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Police", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Police_Biblioteke_policaBibliotekaID",
                        column: x => x.policaBibliotekaID,
                        principalTable: "Biblioteke",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Police_policaBibliotekaID",
                table: "Police",
                column: "policaBibliotekaID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Police");

            migrationBuilder.DropTable(
                name: "Biblioteke");
        }
    }
}
