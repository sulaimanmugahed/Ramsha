using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Initial6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FulfillmentRequestItem",
                schema: "Core");

            migrationBuilder.DropColumn(
                name: "ItemOrdered_SupplierId",
                schema: "Core",
                table: "OrderItem");

            migrationBuilder.AddColumn<Guid>(
                name: "FulfillmentRequestId",
                schema: "Core",
                table: "OrderItem",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "DeliveryFee",
                schema: "Core",
                table: "FulfillmentRequest",
                type: "decimal(18,6)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Subtotal",
                schema: "Core",
                table: "FulfillmentRequest",
                type: "decimal(18,6)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_FulfillmentRequestId",
                schema: "Core",
                table: "OrderItem",
                column: "FulfillmentRequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_FulfillmentRequest_FulfillmentRequestId",
                schema: "Core",
                table: "OrderItem",
                column: "FulfillmentRequestId",
                principalSchema: "Core",
                principalTable: "FulfillmentRequest",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_FulfillmentRequest_FulfillmentRequestId",
                schema: "Core",
                table: "OrderItem");

            migrationBuilder.DropIndex(
                name: "IX_OrderItem_FulfillmentRequestId",
                schema: "Core",
                table: "OrderItem");

            migrationBuilder.DropColumn(
                name: "FulfillmentRequestId",
                schema: "Core",
                table: "OrderItem");

            migrationBuilder.DropColumn(
                name: "DeliveryFee",
                schema: "Core",
                table: "FulfillmentRequest");

            migrationBuilder.DropColumn(
                name: "Subtotal",
                schema: "Core",
                table: "FulfillmentRequest");

            migrationBuilder.AddColumn<Guid>(
                name: "ItemOrdered_SupplierId",
                schema: "Core",
                table: "OrderItem",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "FulfillmentRequestItem",
                schema: "Core",
                columns: table => new
                {
                    FulfillmentRequestId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    InventoryItemId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,6)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Sku = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FulfillmentRequestItem", x => new { x.FulfillmentRequestId, x.Id });
                    table.ForeignKey(
                        name: "FK_FulfillmentRequestItem_FulfillmentRequest_FulfillmentRequestId",
                        column: x => x.FulfillmentRequestId,
                        principalSchema: "Core",
                        principalTable: "FulfillmentRequest",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }
    }
}
