using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mayar.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMiddleCategoryModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ButtonLink",
                table: "MiddleCategories",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ButtonTextArabic",
                table: "MiddleCategories",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ButtonTextEnglish",
                table: "MiddleCategories",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ImageAlt",
                table: "MiddleCategories",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "MiddleCategories",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "SubtitleArabic",
                table: "MiddleCategories",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "SubtitleEnglish",
                table: "MiddleCategories",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ButtonLink",
                table: "MiddleCategories");

            migrationBuilder.DropColumn(
                name: "ButtonTextArabic",
                table: "MiddleCategories");

            migrationBuilder.DropColumn(
                name: "ButtonTextEnglish",
                table: "MiddleCategories");

            migrationBuilder.DropColumn(
                name: "ImageAlt",
                table: "MiddleCategories");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "MiddleCategories");

            migrationBuilder.DropColumn(
                name: "SubtitleArabic",
                table: "MiddleCategories");

            migrationBuilder.DropColumn(
                name: "SubtitleEnglish",
                table: "MiddleCategories");
        }
    }
}
