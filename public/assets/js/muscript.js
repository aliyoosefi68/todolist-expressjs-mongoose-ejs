document.addEventListener("DOMContentLoaded", () => {
  // گرفتن تمام دکمه‌های حذف تسک
  const removeButtons = document.querySelectorAll(".remove-task");
  const doneButton = document.querySelectorAll(".done-task");

  doneButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      // جلوگیری از عملکرد پیش‌فرض دکمه
      event.preventDefault();

      // گرفتن لی آی که دکمه داخل آن قرار دارد
      const taskItem = button.closest("li");
      const taskId = taskItem.dataset.id;
      const title = taskItem.dataset.title;
      console.log(taskId);
      console.log(title);

      fetch(`/update/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, done: "done" }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // اگر حذف با موفقیت انجام شد، تسک را از لیست حذف می‌کنیم
            taskItem.remove();
            window.location.reload();
          } else {
            // اگر خطایی وجود داشت، آن را نمایش می‌دهیم
            alert("خطا در حذف تسک");
          }
        });
    });
  });

  // اضافه کردن رویداد کلیک به دکمه‌های حذف تسک
  removeButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      // جلوگیری از عملکرد پیش‌فرض دکمه
      event.preventDefault();

      // گرفتن لی آی که دکمه داخل آن قرار دارد
      const taskItem = button.closest("li");
      console.log(taskItem);
      // فرض می‌کنیم که ID تسک در دیتاست (dataset) لی آی ذخیره شده است
      const taskId = taskItem.dataset.id;
      console.log("task id =>", taskId);
      // ارسال درخواست AJAX به سرور برای حذف تسک
      fetch(`/delete/${taskId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // اگر حذف با موفقیت انجام شد، تسک را از لیست حذف می‌کنیم
            taskItem.remove();
          } else {
            // اگر خطایی وجود داشت، آن را نمایش می‌دهیم
            alert("خطا در حذف تسک");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("خطا در ارتباط با سرور");
        });
    });
  });
});
