using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddProfilw2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_ProductVariant_ProductId_ProductVariantId",
                schema: "Core",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_ProductId_ProductVariantId",
                schema: "Core",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "ProductVariantId",
                schema: "Core",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "AverageRating",
                schema: "Core",
                table: "ProductVariant");

            migrationBuilder.DropColumn(
                name: "NumberOfRatings",
                schema: "Core",
                table: "ProductVariant");

            migrationBuilder.AddColumn<decimal>(
                name: "AverageRating",
                schema: "Core",
                table: "Products",
                type: "decimal(18,6)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfRatings",
                schema: "Core",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_ProductId",
                schema: "Core",
                table: "Ratings",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Products_ProductId",
                schema: "Core",
                table: "Ratings",
                column: "ProductId",
                principalSchema: "Core",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Products_ProductId",
                schema: "Core",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_ProductId",
                schema: "Core",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "AverageRating",
                schema: "Core",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "NumberOfRatings",
                schema: "Core",
                table: "Products");

            migrationBuilder.AddColumn<Guid>(
                name: "ProductVariantId",
                schema: "Core",
                table: "Ratings",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<decimal>(
                name: "AverageRating",
                schema: "Core",
                table: "ProductVariant",
                type: "decimal(18,6)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfRatings",
                schema: "Core",
                table: "ProductVariant",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_ProductId_ProductVariantId",
                schema: "Core",
                table: "Ratings",
                columns: new[] { "ProductId", "ProductVariantId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_ProductVariant_ProductId_ProductVariantId",
                schema: "Core",
                table: "Ratings",
                columns: new[] { "ProductId", "ProductVariantId" },
                principalSchema: "Core",
                principalTable: "ProductVariant",
                principalColumns: new[] { "ProductId", "Id" },
                onDelete: ReferentialAction.Restrict);
        }
    }
}
