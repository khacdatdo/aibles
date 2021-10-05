
# 🔥 RESTful API

- Là một tập các quy tắc và cơ chế mà theo đó, một ứng dụng hay một thành phần sẽ tương tác với một ứng dụng hay thành phần khác.


## 👉 Thành phần
  - [Endpoint](#endpoint)
  - [Method](#method)
  - [Headers](#headers)
  - [Body](#body)
  - [Status Code](#status-code)
  

### Endpoint
- Là đường dẫn mà client sẽ gửi yêu cầu đến.
- Ví dụ: Endpoint tới API của Facebook:
    ```url
    https://graph.facebook.com/
    ```

### Method
- Là các phương thức được quy định đối với các loại yêu cầu khác nhau.
    + **`GET`**:  truy xuất resource và trả về resource yêu cầu ở phần body của response
        message cho client.
    + **`POST`**: tạo 1 resource mới, thông tin của resource mới được chứa ở body của
        request message. **`POST`** cũng được dùng để kích hoạt các chức năng mà
        không tạo resource.
    + **`PUT`**: tạo mới hoặc thay đổi resource, phần body của request message chứa
        resource cần tạo hoặc thay đổi.
    + **`PATCH`**: cập nhật một phần tài nguyên, phần request body chứa cụ thể phần
        cần cập nhật của resource.
    + **`DELETE`**: xóa resource.

- Ví dụ: Một yêu cầu với phương thức **`GET`** được gửi đến API của Facebook:

    ![Image](https://dl.dropboxusercontent.com/s/1ps6dg9o9em5rfl/Screenshot%202021-10-05%20162100.png)


### Headers
- Là tiêu đề của yêu cầu cung cấp thông tin cho client và server.
- Ví dụ: Một số thông tin nằm trong headers gửi lên API của Facebook:

    ![Image](https://dl.dropboxusercontent.com/s/b32xuvkxchkop5t/Screenshot%202021-10-05%20165203.png)

### Body
- Body chứa thông tin mà client gửi lên cho server.
- Ví dụ: Body chứa một JSON có thông tin người dùng gửi lên server:

    ![Image](https://dl.dropboxusercontent.com/s/050xzkqjt1dc0nn/Screenshot%202021-10-05%20170133.png)

### Status Code
- Là một mã được server trả về để thông báo kết quả xử lí yêu cầu.
- Ví dụ: **`200`** nghĩa là yêu cầu của client đã được thực hiện thành công:


    ![Image](https://dl.dropbox.com/s/pbzm4j0rxjwxoeh/Screenshot%202021-10-05%20170832.png)

- **Một số HTTP Status Code phổ biến:**
    + `2xx` Success (Thành công):
        + `200` OK - Request đã được tiếp nhận và xử lý thành công.
        + `201` Created - Trả về khi một resouce vừa được tạo thành công.
        + `202` Accepted - Request được chấp nhận cho xử lý, nhưng việc xử lý chưa hoàn
            thành.
        + `204` No Content - Server đã xử lý thành công request nhưng không trả về bất cứ
            content nào.
    + `4xx` Client Error (Lỗi Client):
        + `400` Bad Request - Request không hợp lệ.
        + `401` Unauthorized - Request cần có auth.
        + `403` Forbidden - bị từ chối không cho phép.
        + `404` Not Found - Không tìm thấy resource từ URI.
    + `5xx` Server Error (Lỗi Server):
        + `500` Internal Server Error - Một thông báo chung chung, được đưa ra khi Server gặp
            phải một trường hợp bất ngờ.
        + `501` Not Implemented - Server không công nhận các Request method hoặc không
            có khả năng xử lý nó.
