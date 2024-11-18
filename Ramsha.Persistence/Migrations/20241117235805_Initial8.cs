using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initial8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvailableQuantity",
                schema: "Core",
                table: "ProductVariant");

            migrationBuilder.DropColumn(
                name: "FinalPrice",
                schema: "Core",
                table: "ProductVariant");

            migrationBuilder.DropColumn(
                name: "Price",
                schema: "Core",
                table: "ProductVariant");

            migrationBuilder.DropColumn(
                name: "TotalQuantity",
                schema: "Core",
                table: "ProductVariant");

            migrationBuilder.DropColumn(
                name: "AvailableQuantity",
                schema: "Core",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "AverageRating",
                schema: "Core",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "FinalPrice",
                schema: "Core",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "NumberOfRatings",
                schema: "Core",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "Price",
                schema: "Core",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "TotalQuantity",
                schema: "Core",
                table: "Products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AvailableQuantity",
                schema: "Core",
                table: "ProductVariant",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "FinalPrice",
                schema: "Core",
                table: "ProductVariant",
                type: "decimal(18,6)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                schema: "Core",
                table: "ProductVariant",
                type: "decimal(18,6)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "TotalQuantity",
                schema: "Core",
                table: "ProductVariant",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AvailableQuantity",
                schema: "Core",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "AverageRating",
                schema: "Core",
                table: "Products",
                type: "decimal(18,6)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "FinalPrice",
                schema: "Core",
                table: "Products",
                type: "decimal(18,6)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfRatings",
                schema: "Core",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                schema: "Core",
                table: "Products",
                type: "decimal(18,6)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalQuantity",
                schema: "Core",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
