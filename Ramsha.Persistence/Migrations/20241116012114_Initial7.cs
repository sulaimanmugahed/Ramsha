using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initial7 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InventoryItems_Suppliers_SupplierId",
                schema: "Core",
                table: "InventoryItems");

            migrationBuilder.DropForeignKey(
                name: "FK_SupplyRequests_Currencies_CurrencyId",
                schema: "Core",
                table: "SupplyRequests");

            migrationBuilder.DropIndex(
                name: "IX_SupplyRequests_CurrencyId",
                schema: "Core",
                table: "SupplyRequests");

            migrationBuilder.DropIndex(
                name: "IX_InventoryItems_SupplierId_ProductId_ProductVariantId",
                schema: "Core",
                table: "InventoryItems");

            migrationBuilder.RenameColumn(
                name: "CurrencyId",
                schema: "Core",
                table: "SupplyRequests",
                newName: "Currency");

            migrationBuilder.AlterColumn<Guid>(
                name: "SupplierId",
                schema: "Core",
                table: "InventoryItems",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryItems_SupplierId_ProductId_ProductVariantId",
                schema: "Core",
                table: "InventoryItems",
                columns: new[] { "SupplierId", "ProductId", "ProductVariantId" },
                unique: true,
                filter: "[SupplierId] IS NOT NULL AND [ProductVariantId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_InventoryItems_Suppliers_SupplierId",
                schema: "Core",
                table: "InventoryItems",
                column: "SupplierId",
                principalSchema: "Core",
                principalTable: "Suppliers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InventoryItems_Suppliers_SupplierId",
                schema: "Core",
                table: "InventoryItems");

            migrationBuilder.DropIndex(
                name: "IX_InventoryItems_SupplierId_ProductId_ProductVariantId",
                schema: "Core",
                table: "InventoryItems");

            migrationBuilder.RenameColumn(
                name: "Currency",
                schema: "Core",
                table: "SupplyRequests",
                newName: "CurrencyId");

            migrationBuilder.AlterColumn<Guid>(
                name: "SupplierId",
                schema: "Core",
                table: "InventoryItems",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SupplyRequests_CurrencyId",
                schema: "Core",
                table: "SupplyRequests",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_InventoryItems_SupplierId_ProductId_ProductVariantId",
                schema: "Core",
                table: "InventoryItems",
                columns: new[] { "SupplierId", "ProductId", "ProductVariantId" },
                unique: true,
                filter: "[ProductVariantId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_InventoryItems_Suppliers_SupplierId",
                schema: "Core",
                table: "InventoryItems",
                column: "SupplierId",
                principalSchema: "Core",
                principalTable: "Suppliers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
    }
}
