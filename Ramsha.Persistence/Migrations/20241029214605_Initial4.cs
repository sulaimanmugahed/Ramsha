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
            migrationBuilder.AddColumn<int>(
                name: "AvailableQuantity",
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

            migrationBuilder.AlterColumn<string>(
                name: "PaymentIntentId",
                schema: "Core",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvailableQuantity",
                schema: "Core",
                table: "ProductVariant");

            migrationBuilder.DropColumn(
                name: "AvailableQuantity",
                schema: "Core",
                table: "Products");

            migrationBuilder.AlterColumn<string>(
                name: "PaymentIntentId",
                schema: "Core",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
