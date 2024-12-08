using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ramsha.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddDeliveryAgent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DeliveryAgentId",
                schema: "Core",
                table: "FulfillmentRequest",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DeliveryAgents",
                schema: "Core",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    Deleted = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedBy = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryAgents", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FulfillmentRequest_DeliveryAgentId",
                schema: "Core",
                table: "FulfillmentRequest",
                column: "DeliveryAgentId");

            migrationBuilder.AddForeignKey(
                name: "FK_FulfillmentRequest_DeliveryAgents_DeliveryAgentId",
                schema: "Core",
                table: "FulfillmentRequest",
                column: "DeliveryAgentId",
                principalSchema: "Core",
                principalTable: "DeliveryAgents",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FulfillmentRequest_DeliveryAgents_DeliveryAgentId",
                schema: "Core",
                table: "FulfillmentRequest");

            migrationBuilder.DropTable(
                name: "DeliveryAgents",
                schema: "Core");

            migrationBuilder.DropIndex(
                name: "IX_FulfillmentRequest_DeliveryAgentId",
                schema: "Core",
                table: "FulfillmentRequest");

            migrationBuilder.DropColumn(
                name: "DeliveryAgentId",
                schema: "Core",
                table: "FulfillmentRequest");
        }
    }
}
