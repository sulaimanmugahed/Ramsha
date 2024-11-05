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
            migrationBuilder.RenameColumn(
                name: "Address2",
                schema: "Core",
                table: "SupplierAddress",
                newName: "Display");

            migrationBuilder.RenameColumn(
                name: "Address1",
                schema: "Core",
                table: "SupplierAddress",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Address2",
                schema: "Core",
                table: "Orders",
                newName: "ShippingAddress_Display");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Address1",
                schema: "Core",
                table: "Orders",
                newName: "ShippingAddress_Description");

            migrationBuilder.RenameColumn(
                name: "Address2",
                schema: "Core",
                table: "CustomerAddress",
                newName: "Display");

            migrationBuilder.RenameColumn(
                name: "Address1",
                schema: "Core",
                table: "CustomerAddress",
                newName: "Description");

            migrationBuilder.AddColumn<double>(
                name: "ShippingAddress_Latitude",
                schema: "Core",
                table: "Orders",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "ShippingAddress_Longitude",
                schema: "Core",
                table: "Orders",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShippingAddress_Latitude",
                schema: "Core",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ShippingAddress_Longitude",
                schema: "Core",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Display",
                schema: "Core",
                table: "SupplierAddress",
                newName: "Address2");

            migrationBuilder.RenameColumn(
                name: "Description",
                schema: "Core",
                table: "SupplierAddress",
                newName: "Address1");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Display",
                schema: "Core",
                table: "Orders",
                newName: "ShippingAddress_Address2");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress_Description",
                schema: "Core",
                table: "Orders",
                newName: "ShippingAddress_Address1");

            migrationBuilder.RenameColumn(
                name: "Display",
                schema: "Core",
                table: "CustomerAddress",
                newName: "Address2");

            migrationBuilder.RenameColumn(
                name: "Description",
                schema: "Core",
                table: "CustomerAddress",
                newName: "Address1");
        }
    }
}
