using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Identity.Migrations
{
    /// <inheritdoc />
    public partial class AddAccountPermissions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccountPermission",
                schema: "Identity",
                columns: table => new
                {
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PermissionsTempId = table.Column<int>(type: "int", nullable: false),
                    PermissionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountPermission", x => new { x.AccountId, x.PermissionsTempId });
                    table.ForeignKey(
                        name: "FK_AccountPermission_Account_AccountId",
                        column: x => x.AccountId,
                        principalSchema: "Identity",
                        principalTable: "Account",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccountPermission_Permissions_PermissionId",
                        column: x => x.PermissionId,
                        principalSchema: "Identity",
                        principalTable: "Permissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccountPermission_PermissionId",
                schema: "Identity",
                table: "AccountPermission",
                column: "PermissionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountPermission",
                schema: "Identity");
        }
    }
}
