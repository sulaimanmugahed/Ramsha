using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Identity.Migrations
{
    /// <inheritdoc />
    public partial class AddAccountPermissions4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                schema: "Identity",
                table: "Permissions");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                schema: "Identity",
                table: "Permissions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                schema: "Identity",
                table: "Permissions");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                schema: "Identity",
                table: "Permissions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
