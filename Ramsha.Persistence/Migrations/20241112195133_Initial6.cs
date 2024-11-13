using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initial6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CurrencyRates",
                schema: "Core");

            migrationBuilder.RenameColumn(
                name: "Currency",
                schema: "Core",
                table: "SupplyRequests",
                newName: "CurrencyId");

            migrationBuilder.CreateTable(
                name: "Currencies",
                schema: "Core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CurrencyCode = table.Column<int>(type: "int", nullable: false),
                    ExchangeRate = table.Column<decimal>(type: "decimal(18,6)", nullable: false),
                    LastUpdate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currencies", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SupplyRequests_CurrencyId",
                schema: "Core",
                table: "SupplyRequests",
                column: "CurrencyId");

            migrationBuilder.AddForeignKey(
                name: "FK_SupplyRequests_Currencies_CurrencyId",
                schema: "Core",
                table: "SupplyRequests",
                column: "CurrencyId",
                principalSchema: "Core",
                principalTable: "Currencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SupplyRequests_Currencies_CurrencyId",
                schema: "Core",
                table: "SupplyRequests");

            migrationBuilder.DropTable(
                name: "Currencies",
                schema: "Core");

            migrationBuilder.DropIndex(
                name: "IX_SupplyRequests_CurrencyId",
                schema: "Core",
                table: "SupplyRequests");

            migrationBuilder.RenameColumn(
                name: "CurrencyId",
                schema: "Core",
                table: "SupplyRequests",
                newName: "Currency");

            migrationBuilder.CreateTable(
                name: "CurrencyRates",
                schema: "Core",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Currency = table.Column<int>(type: "int", nullable: false),
                    ExchangeRate = table.Column<decimal>(type: "decimal(18,6)", nullable: false),
                    LastUpdate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrencyRates", x => x.Id);
                });
        }
    }
}
