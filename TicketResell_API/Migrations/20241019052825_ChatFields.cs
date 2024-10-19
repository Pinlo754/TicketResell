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
                    reUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LastMessage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MessageId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MessageSeen = table.Column<bool>(type: "bit", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ChatseUserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatData", x => x.reUserId);
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
                    messageDataId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    createdAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    seUserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    messageId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessageData", x => x.messageDataId);
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
        }
    }
}
