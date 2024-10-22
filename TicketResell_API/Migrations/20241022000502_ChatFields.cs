using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TicketResell_API.Migrations
{
    /// <inheritdoc />
    public partial class ChatFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "address",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "bio",
                table: "AspNetUsers",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Chats",
                columns: table => new
                {
                    seUserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chats", x => x.seUserId);
                });

            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    messageId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.messageId);
                });

            migrationBuilder.CreateTable(
                name: "ChatData",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    lastMessage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    messageId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    messageSeen = table.Column<bool>(type: "bit", nullable: false),
                    reUserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    updatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ChatseUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatData", x => x.id);
                    table.ForeignKey(
                        name: "FK_ChatData_Chats_ChatseUserId",
                        column: x => x.ChatseUserId,
                        principalTable: "Chats",
                        principalColumn: "seUserId");
                });

            migrationBuilder.CreateTable(
                name: "MessageData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SeUserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    messageId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MessageData_Message_messageId",
                        column: x => x.messageId,
                        principalTable: "Message",
                        principalColumn: "messageId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChatData_ChatseUserId",
                table: "ChatData",
                column: "ChatseUserId");

            migrationBuilder.CreateIndex(
                name: "IX_MessageData_messageId",
                table: "MessageData",
                column: "messageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChatData");

            migrationBuilder.DropTable(
                name: "MessageData");

            migrationBuilder.DropTable(
                name: "Chats");

            migrationBuilder.DropTable(
                name: "Message");

            migrationBuilder.DropColumn(
                name: "bio",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<string>(
                name: "address",
                table: "AspNetUsers",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
