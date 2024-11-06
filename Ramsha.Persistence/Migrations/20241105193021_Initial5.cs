using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initial5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                schema: "Core",
                table: "FulfillmentRequestItem",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                schema: "Core",
                table: "FulfillmentRequestItem",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                schema: "Core",
                table: "FulfillmentRequestItem",
                type: "decimal(18,6)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "Sku",
                schema: "Core",
                table: "FulfillmentRequestItem",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                schema: "Core",
                table: "FulfillmentRequestItem");

            migrationBuilder.DropColumn(
                name: "Name",
                schema: "Core",
                table: "FulfillmentRequestItem");

            migrationBuilder.DropColumn(
                name: "Price",
                schema: "Core",
                table: "FulfillmentRequestItem");

            migrationBuilder.DropColumn(
                name: "Sku",
                schema: "Core",
                table: "FulfillmentRequestItem");
        }
    }
}
