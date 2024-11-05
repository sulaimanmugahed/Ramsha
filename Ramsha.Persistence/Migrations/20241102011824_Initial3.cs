using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initial3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "DimensionalFactor",
                schema: "Core",
                table: "ProductVariant",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "HeightDimension",
                schema: "Core",
                table: "ProductVariant",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "LengthDimension",
                schema: "Core",
                table: "ProductVariant",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "WidthDimension",
                schema: "Core",
                table: "ProductVariant",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DimensionalFactor",
                schema: "Core",
                table: "ProductVariant");

            migrationBuilder.DropColumn(
                name: "HeightDimension",
                schema: "Core",
                table: "ProductVariant");

            migrationBuilder.DropColumn(
                name: "LengthDimension",
                schema: "Core",
                table: "ProductVariant");

            migrationBuilder.DropColumn(
                name: "WidthDimension",
                schema: "Core",
                table: "ProductVariant");
        }
    }
}
