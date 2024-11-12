using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initial4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Currency",
                schema: "Core",
                table: "InventoryItems",
                newName: "ItemWholesalePriceCurrency");

            migrationBuilder.RenameColumn(
                name: "WholesalePrice",
                schema: "Core",
                table: "InventoryItems",
                newName: "ItemWholesalePriceAmount");

            migrationBuilder.RenameColumn(
                name: "RetailPrice",
                schema: "Core",
                table: "InventoryItems",
                newName: "ItemRetailPriceAmount");

            migrationBuilder.RenameColumn(
                name: "FinalPrice",
                schema: "Core",
                table: "InventoryItems",
                newName: "ItemFinalPriceAmount");

            migrationBuilder.AlterColumn<int>(
                name: "ItemWholesalePriceCurrency",
                schema: "Core",
                table: "InventoryItems",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "ItemPriceCurrency",
                schema: "Core",
                table: "InventoryItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ItemRetailPriceCurrency",
                schema: "Core",
                table: "InventoryItems",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemPriceCurrency",
                schema: "Core",
                table: "InventoryItems");

            migrationBuilder.DropColumn(
                name: "ItemRetailPriceCurrency",
                schema: "Core",
                table: "InventoryItems");

            migrationBuilder.RenameColumn(
                name: "ItemWholesalePriceCurrency",
                schema: "Core",
                table: "InventoryItems",
                newName: "Currency");

            migrationBuilder.RenameColumn(
                name: "ItemWholesalePriceAmount",
                schema: "Core",
                table: "InventoryItems",
                newName: "WholesalePrice");

            migrationBuilder.RenameColumn(
                name: "ItemRetailPriceAmount",
                schema: "Core",
                table: "InventoryItems",
                newName: "RetailPrice");

            migrationBuilder.RenameColumn(
                name: "ItemFinalPriceAmount",
                schema: "Core",
                table: "InventoryItems",
                newName: "FinalPrice");

            migrationBuilder.AlterColumn<string>(
                name: "Currency",
                schema: "Core",
                table: "InventoryItems",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
