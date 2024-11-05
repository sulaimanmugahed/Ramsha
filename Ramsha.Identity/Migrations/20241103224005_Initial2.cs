using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Identity.Migrations
{
    /// <inheritdoc />
    public partial class Initial2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Account_UserAddress_Id",
                schema: "Identity",
                table: "Account");

            migrationBuilder.DropTable(
                name: "UserAddress",
                schema: "Identity");

            migrationBuilder.AddColumn<string>(
                name: "Address_City",
                schema: "Identity",
                table: "Account",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address_Country",
                schema: "Identity",
                table: "Account",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address_Description",
                schema: "Identity",
                table: "Account",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address_Display",
                schema: "Identity",
                table: "Account",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address_FullName",
                schema: "Identity",
                table: "Account",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Address_Latitude",
                schema: "Identity",
                table: "Account",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Address_Longitude",
                schema: "Identity",
                table: "Account",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address_State",
                schema: "Identity",
                table: "Account",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address_Zip",
                schema: "Identity",
                table: "Account",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address_City",
                schema: "Identity",
                table: "Account");

            migrationBuilder.DropColumn(
                name: "Address_Country",
                schema: "Identity",
                table: "Account");

            migrationBuilder.DropColumn(
                name: "Address_Description",
                schema: "Identity",
                table: "Account");

            migrationBuilder.DropColumn(
                name: "Address_Display",
                schema: "Identity",
                table: "Account");

            migrationBuilder.DropColumn(
                name: "Address_FullName",
                schema: "Identity",
                table: "Account");

            migrationBuilder.DropColumn(
                name: "Address_Latitude",
                schema: "Identity",
                table: "Account");

            migrationBuilder.DropColumn(
                name: "Address_Longitude",
                schema: "Identity",
                table: "Account");

            migrationBuilder.DropColumn(
                name: "Address_State",
                schema: "Identity",
                table: "Account");

            migrationBuilder.DropColumn(
                name: "Address_Zip",
                schema: "Identity",
                table: "Account");

            migrationBuilder.CreateTable(
                name: "UserAddress",
                schema: "Identity",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Display = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longitude = table.Column<double>(type: "float", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Zip = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAddress", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Account_UserAddress_Id",
                schema: "Identity",
                table: "Account",
                column: "Id",
                principalSchema: "Identity",
                principalTable: "UserAddress",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
