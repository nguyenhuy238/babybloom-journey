using BabyFirst.Domain.Entities;
using BabyFirst.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BabyFirst.Infrastructure.Data;

public static class ApplicationDbContextSeed
{
    public static async Task SeedAsync(ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        // Seed Roles
        if (!await roleManager.RoleExistsAsync("Admin"))
        {
            await roleManager.CreateAsync(new IdentityRole("Admin"));
        }
        if (!await roleManager.RoleExistsAsync("Staff"))
        {
            await roleManager.CreateAsync(new IdentityRole("Staff"));
        }
        if (!await roleManager.RoleExistsAsync("Parent"))
        {
            await roleManager.CreateAsync(new IdentityRole("Parent"));
        }

        // Seed Admin User
        var adminEmail = "admin@babyfirst.com";
        var adminUser = await userManager.FindByEmailAsync(adminEmail);
        if (adminUser == null)
        {
            adminUser = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                EmailConfirmed = true,
                FirstName = "System",
                LastName = "Admin"
            };
            await userManager.CreateAsync(adminUser, "Admin123!");
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }

        // Seed Sample Courses
        if (!await context.Courses.AnyAsync())
        {
            var course1 = new Course("Kích thích đa giác quan cho bé 0-3 tháng", 0, 3);
            course1.SetSubtitle("Giai đoạn vàng phát triển giác quan");
            course1.SetPrice("Miễn phí");
            course1.SetDuration("2 tuần");
            course1.SetDescription("Khóa học giúp ba mẹ hiểu về sự phát triển giác quan và các bài tập vận động sớm.");
            course1.SetThumbnailUrl("https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000");
            course1.AddFeature("Học online 24/7");
            course1.AddFeature("Video hướng dẫn chi tiết");
            course1.AddFeature("Tương tác cùng chuyên gia");

            var lesson1 = new Lesson("Tummy Time - Nằm sấp vui vẻ", ContentType.Video, course1.Id);
            lesson1.SetDescription("Hướng dẫn kỹ thuật nằm sấp an toàn và hiệu quả.");
            lesson1.SetVideoUrl("https://example.com/videos/tummy-time");
            lesson1.SetActivityInstructions("Đặt bé nằm sấp trên thảm mềm, dùng đồ chơi màu sắc thu hút.");
            lesson1.SetRequiredMaterials("Thảm tập, đồ chơi treo");
            lesson1.Publish();
            course1.AddLesson(lesson1);

            var lesson2 = new Lesson("Massage bé yêu", ContentType.Video, course1.Id);
            lesson2.SetDescription("Các động tác massage cơ bản giúp bé thư giãn.");
            lesson2.SetVideoUrl("https://example.com/videos/baby-massage");
            lesson2.SetActivityInstructions("Sử dụng dầu massage tự nhiên, vuốt nhẹ nhàng từ chân lên đầu.");
            lesson2.SetRequiredMaterials("Dầu massage");
            lesson2.Publish();
            course1.AddLesson(lesson2);

            course1.Publish();

            var course2 = new Course("Ăn dặm không nước mắt", 6, 24);
            course2.SetSubtitle("Xây dựng thói quen ăn uống lành mạnh");
            course2.SetPrice("499.000đ");
            course2.SetDuration("4 tuần");
            course2.SetDescription("Hướng dẫn chi tiết về các phương pháp ăn dặm phổ biến.");
            course2.SetThumbnailUrl("https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000");
            course2.AddFeature("Lộ trình ăn dặm 30 ngày");
            course2.AddFeature("Thực đơn đa dạng");
            course2.Publish();

            context.Courses.AddRange(course1, course2);
        }

        // Seed Sample Blog Posts
        if (!await context.BlogPosts.AnyAsync())
        {
            var post1 = new BlogPost("5 hoạt động vận động thô cho bé 6-12 tháng", "Nội dung chi tiết...", "Dr. Mai Anh");
            post1.SetCategory("motor");
            post1.SetReadTime("5 phút");
            post1.SetExcerpt("Những hoạt động giúp bé phát triển cơ bắp và cân bằng.");
            post1.SetAuthor("Dr. Mai Anh", "👩‍⚕️");
            post1.SetThumbnailUrl("🏃");
            post1.Publish();

            var post2 = new BlogPost("Cách xây dựng sự gắn kết với trẻ sơ sinh", "Nội dung chi tiết...", "ThS. Hương Giang");
            post2.SetCategory("emotional");
            post2.SetReadTime("7 phút");
            post2.SetExcerpt("Phương pháp nuôi dạy con giúp bé phát triển cảm xúc lành mạnh.");
            post2.SetAuthor("ThS. Hương Giang", "👩‍🏫");
            post2.SetThumbnailUrl("💝");
            post2.Publish();

            context.BlogPosts.AddRange(post1, post2);
        }

        // Seed Sample Products
        if (!await context.Products.AnyAsync())
        {
            var prod1 = new Product("Bộ khối gỗ Montessori Rainbow", 450000);
            prod1.SetOriginalPrice(550000);
            prod1.SetCategory("wooden");
            prod1.SetAgeRange("6-24 tháng");
            prod1.SetDescription("Bộ khối gỗ rainbow cao cấp giúp phát triển nhận thức màu sắc.");
            prod1.SetThumbnailUrl("https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop");
            prod1.SetRating(4.9, 128);
            prod1.SetProductType("babyfirst");
            prod1.AddDevelopmentArea("iq");
            prod1.AddDevelopmentArea("sensory");

            var prod2 = new Product("Bảng bận rộn Busy Board", 650000);
            prod2.SetCategory("physical");
            prod2.SetAgeRange("12-36 tháng");
            prod2.SetDescription("Bảng bận rộn với nhiều hoạt động phát triển vận động tinh.");
            prod2.SetThumbnailUrl("https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop");
            prod2.SetRating(4.8, 234);
            prod2.SetProductType("direct");
            prod2.AddDevelopmentArea("physical");

            context.Products.AddRange(prod1, prod2);
        }

        await context.SaveChangesAsync();

        // Seed Sample Parent & Baby
        var parentEmail = "parent@example.com";
        var identityParent = await userManager.FindByEmailAsync(parentEmail);
        if (identityParent == null)
        {
            identityParent = new ApplicationUser
            {
                UserName = parentEmail,
                Email = parentEmail,
                EmailConfirmed = true,
                FirstName = "Nguyen",
                LastName = "Me"
            };
            await userManager.CreateAsync(identityParent, "Parent123!");
            await userManager.AddToRoleAsync(identityParent, "Parent");
        }

        var domainUser = await context.DomainUsers.FirstOrDefaultAsync(u => u.Email == parentEmail);
        if (domainUser == null)
        {
            domainUser = new User("Nguyen", "Me", parentEmail, UserRole.Parent);
            context.DomainUsers.Add(domainUser);
            await context.SaveChangesAsync();
        }

        var baby = await context.Babies.FirstOrDefaultAsync(b => b.UserId == domainUser.Id);
        if (baby == null)
        {
            baby = new Baby("Bé Bún", DateTime.UtcNow.AddMonths(-2), domainUser.Id);
            baby.SetGender("Nữ");
            baby.SetDevelopmentGoals("Phát triển vận động và nhận biết màu sắc");
            context.Babies.Add(baby);
            await context.SaveChangesAsync();
        }

        // Seed Progress
        if (!await context.Progress.AnyAsync(p => p.BabyId == baby.Id))
        {
            var firstCourse = await context.Courses.Include(c => c.Lessons).FirstOrDefaultAsync();
            if (firstCourse != null && firstCourse.Lessons.Any())
            {
                var lesson = firstCourse.Lessons.First();
                var progress = new Progress(baby.Id, lesson.Id);
                progress.Start();
                progress.UpdateProgress(50);
                progress.AddTimeSpent(15);
                progress.SetNotes("Bé rất hợp tác trong bài tập nằm sấp.");
                
                context.Progress.Add(progress);
                await context.SaveChangesAsync();
            }
        }
    }
}
