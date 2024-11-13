using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicketResell_API.Migrations
{
    /// <inheritdoc />
    public partial class phongnt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "images",
                table: "Tickets",
                newName: "imagesVerify");

            migrationBuilder.AddColumn<string>(
                name: "imagesQR",
                table: "Tickets",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imagesQR",
                table: "Tickets");

            migrationBuilder.RenameColumn(
                name: "imagesVerify",
                table: "Tickets",
                newName: "images");
        }
    }
}
