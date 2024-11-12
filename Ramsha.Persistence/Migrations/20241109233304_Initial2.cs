using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initial2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ItemSupplied_ImageUrl",
                schema: "Core",
                table: "SupplyItem",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ItemSupplied_Name",
                schema: "Core",
                table: "SupplyItem",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemSupplied_ImageUrl",
                schema: "Core",
                table: "SupplyItem");

            migrationBuilder.DropColumn(
                name: "ItemSupplied_Name",
                schema: "Core",
                table: "SupplyItem");
        }
    }
}
