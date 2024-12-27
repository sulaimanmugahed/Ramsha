using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Identity.Migrations
{
    /// <inheritdoc />
    public partial class AddAccountPermissions3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AccountPermission",
                schema: "Identity",
                table: "AccountPermission");

            migrationBuilder.DropColumn(
                name: "PermissionsTempId",
                schema: "Identity",
                table: "AccountPermission");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AccountPermission",
                schema: "Identity",
                table: "AccountPermission",
                columns: new[] { "AccountId", "PermissionId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_AccountPermission",
                schema: "Identity",
                table: "AccountPermission");

            migrationBuilder.AddColumn<int>(
                name: "PermissionsTempId",
                schema: "Identity",
                table: "AccountPermission",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_AccountPermission",
                schema: "Identity",
                table: "AccountPermission",
                columns: new[] { "AccountId", "PermissionsTempId" });
        }
    }
}
