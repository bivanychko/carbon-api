import { expect } from "expect";
import { Express } from "express";
import { Server } from "http";
import request from "supertest";

import { start } from "../bootstrap";

describe("CarbonController", () => {
  let server: Server;
  let app: Express;

  beforeAll(() => {
    ({ app, server } = start());
  });

  afterAll(() => {
    server.close();
  });

  describe("GET /carbons", () => {
    test("should return 401 Unauthorized", async () => {
      await request(app).get("/carbons").expect(401);
    });

    test("should return 200 with array of available carbons", async () => {
      const response = await request(app)
        .get("/carbons")
        .set({
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg5N2ZmLTgzNzYtNGJjZC1iZWRlLTUxZTRjMWIxMDc2MiIsImlhdCI6MTY1NzgwNjEzN30.fccf5nEuf03piIFnaLJldTs8lBX5lAZj5mt-up6A9CFDna7P-jXBhzV2pkvDFt1TPBSUPjin4pBYkWMvKsjaAhV5z4tZ8Md_lCxIKxVd6W7Zj3OQVaEdzDffkRhcansRi7bdXFU1ZQFofupfEAv2SaPWTWEr4pLgd-eOT-_9TAo4ItT7XOUeEvGZZHQ8LxrmN-KQntk2bi9Xj0hpEbm_TmZHjXlK0M6-ax5BXzi0iXCO-x0TjGJplX6cSYyeTt5n2ax9-bvwAlLWi4rNNKbMpOz5w2RymHlsM4WDNaBQ-QiTeA6gG3Ly1J5I5rzIY8isbgQu77HOfN7ugExI90qWP9CZtL8I8uRvyWWWCNP-CCIDsdo9YfwsdVYH2OYmmBVzRFGSwhJ0C2K5DjzzTBa5UJMoZJX6PhNnb-9uyVRzEvfXaXLOvrfXN2xDqm5xH6P_BcBYAjfFipkRXHtW471WI94Q6G7phMvYvI6dEhlNUe3q7LgFcNQmJzvt3F7q4bavRYcG1pAA4Q4tNw4MZuprAUPQzCWzgiM8XpTAij2OG-SvZCYPW8KO-04kuhNRjflHGooKpQY7n4OjySWUV0u6bemvIsxlt9Q7guYThEi_HOeRlH4A9Gm8V5lcYsP2_Fh1rAfHAsF6BKNvIFzArzDuZPJXFFxRXAVAqf-GlnsgzbM",
        })
        .expect(200);

      expect(response.body).toStrictEqual([{ id: "3", country: "Spain", status: "available", owner: null }]);
    });
  });

  describe("GET /carbons/my", () => {
    test("should return 401 Unauthorized", async () => {
      await request(app).get("/carbons/my").expect(401);
    });

    test("should return 200 with array of my carbons", async () => {
      const response = await request(app)
        .get("/carbons/my")
        .set({
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg5N2ZmLTgzNzYtNGJjZC1iZWRlLTUxZTRjMWIxMDc2MiIsImlhdCI6MTY1NzgwNjEzN30.fccf5nEuf03piIFnaLJldTs8lBX5lAZj5mt-up6A9CFDna7P-jXBhzV2pkvDFt1TPBSUPjin4pBYkWMvKsjaAhV5z4tZ8Md_lCxIKxVd6W7Zj3OQVaEdzDffkRhcansRi7bdXFU1ZQFofupfEAv2SaPWTWEr4pLgd-eOT-_9TAo4ItT7XOUeEvGZZHQ8LxrmN-KQntk2bi9Xj0hpEbm_TmZHjXlK0M6-ax5BXzi0iXCO-x0TjGJplX6cSYyeTt5n2ax9-bvwAlLWi4rNNKbMpOz5w2RymHlsM4WDNaBQ-QiTeA6gG3Ly1J5I5rzIY8isbgQu77HOfN7ugExI90qWP9CZtL8I8uRvyWWWCNP-CCIDsdo9YfwsdVYH2OYmmBVzRFGSwhJ0C2K5DjzzTBa5UJMoZJX6PhNnb-9uyVRzEvfXaXLOvrfXN2xDqm5xH6P_BcBYAjfFipkRXHtW471WI94Q6G7phMvYvI6dEhlNUe3q7LgFcNQmJzvt3F7q4bavRYcG1pAA4Q4tNw4MZuprAUPQzCWzgiM8XpTAij2OG-SvZCYPW8KO-04kuhNRjflHGooKpQY7n4OjySWUV0u6bemvIsxlt9Q7guYThEi_HOeRlH4A9Gm8V5lcYsP2_Fh1rAfHAsF6BKNvIFzArzDuZPJXFFxRXAVAqf-GlnsgzbM",
        })
        .expect(200);

      expect(response.body).toStrictEqual([
        {
          id: "1",
          country: "Ukraine",
          status: "owned",
          owner: "e3e897ff-8376-4bcd-bede-51e4c1b10762",
        },
        {
          id: "2",
          country: "Ukraine",
          status: "owned",
          owner: "e3e897ff-8376-4bcd-bede-51e4c1b10762",
        },
      ]);
    });
  });

  describe("PUT /carbons/userId/transfer", () => {
    test("should return 400 BadRequest if there is no carbons to transfer", async () => {
      const response = await request(app)
        .put("/carbons/e3e897ff-8376-4bcd-bede-51e4c1b10762/transfer")
        .set({
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNjMDI3NzMzLTkzMjMtNGNiYS1hYmFkLWM0NmQwMmUxYzVmMyIsImlhdCI6MTY1NzgwNzU0Nn0.TO72B7ZgESdx6OcbS7bR3mqD6D8kavVd9sM-HYKW1pj6xvYPUYo1FmBu59oZzyxLIPCIkKYtQRrXWYJOkjiPXKmGEWeCMONKNmT0mNPiP5gbbxVZtaswj31laD5CexHPxX4CJu0YJRwq-pvK1pbIIqFGW9AJ6wzq1HDlYPjp1MfhYDrh5G5vGzMw0jPXn0t_5p6oXp-MY69v6MFrmoxu77PqfnH2qJm8Hb9y84pAlxv5YgTvjjy7QgK2mGp5H7j7kAzLTGah7NysdDp_uq5gg1I3LSqNK48yepJ5XaiAmTJ3ijCsHdwOkG9KXlEM8jwd_b3XYPG1ndyJXzSFismtN7F5FMLvMYgdMC4RzAnVpsS3H3Trbwlfy6EpSxYNP80bb_qI0IDjkuZ0sQzoXp2XVKzbNs-SGS5dvCOieJzIPRxfFN4yjEhEb_sRW5kLJQwWeHcTwwTYVEXD4pyj0BqOpL7ph-6wJ95VCIV5x9-xuXbx1FZ9f1rs1xd1B2iY9x6tjiVhEuJpgM9zV5xeOD6ZztzrFdRTy0ZWpKiCgKeuZWVyvkQ1X7-lckNaDnuFFUmSQL8xC6PqmjP_Q-PDvGeQ1c_eiZS2_LLVScMAQ0lli_QtCSGpxuJLg_HZ5UnPvxtugO5G1MzV2IiUOdQ0oKDL76-iwA3UTL0n4HUPETYgz58",
        })
        .expect(400);

      expect(response.body.message).toBe("You do not have any carbons to transfer");
    });

    test("should return 401 Unauthorized", async () => {
      await request(app).put("/carbons/cc027733-9323-4cba-abad-c46d02e1c5f3/transfer").expect(401);
    });

    test("should return 404 If user you want to transfer carbons does not exist", async () => {
      const response = await request(app)
        .put("/carbons/81c2fdfa-7a85-4494-b0a5-8b12d6b8c553/transfer")
        .set({
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg5N2ZmLTgzNzYtNGJjZC1iZWRlLTUxZTRjMWIxMDc2MiIsImlhdCI6MTY1NzgwNjEzN30.fccf5nEuf03piIFnaLJldTs8lBX5lAZj5mt-up6A9CFDna7P-jXBhzV2pkvDFt1TPBSUPjin4pBYkWMvKsjaAhV5z4tZ8Md_lCxIKxVd6W7Zj3OQVaEdzDffkRhcansRi7bdXFU1ZQFofupfEAv2SaPWTWEr4pLgd-eOT-_9TAo4ItT7XOUeEvGZZHQ8LxrmN-KQntk2bi9Xj0hpEbm_TmZHjXlK0M6-ax5BXzi0iXCO-x0TjGJplX6cSYyeTt5n2ax9-bvwAlLWi4rNNKbMpOz5w2RymHlsM4WDNaBQ-QiTeA6gG3Ly1J5I5rzIY8isbgQu77HOfN7ugExI90qWP9CZtL8I8uRvyWWWCNP-CCIDsdo9YfwsdVYH2OYmmBVzRFGSwhJ0C2K5DjzzTBa5UJMoZJX6PhNnb-9uyVRzEvfXaXLOvrfXN2xDqm5xH6P_BcBYAjfFipkRXHtW471WI94Q6G7phMvYvI6dEhlNUe3q7LgFcNQmJzvt3F7q4bavRYcG1pAA4Q4tNw4MZuprAUPQzCWzgiM8XpTAij2OG-SvZCYPW8KO-04kuhNRjflHGooKpQY7n4OjySWUV0u6bemvIsxlt9Q7guYThEi_HOeRlH4A9Gm8V5lcYsP2_Fh1rAfHAsF6BKNvIFzArzDuZPJXFFxRXAVAqf-GlnsgzbM",
        })
        .expect(404);

      expect(response.body.message).toBe("User you want to transfer carbons does not exist");
    });

    test("should return 204", async () => {
      await request(app)
        .put("/carbons/cc027733-9323-4cba-abad-c46d02e1c5f3/transfer")
        .set({
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUzZTg5N2ZmLTgzNzYtNGJjZC1iZWRlLTUxZTRjMWIxMDc2MiIsImlhdCI6MTY1NzgwNjEzN30.fccf5nEuf03piIFnaLJldTs8lBX5lAZj5mt-up6A9CFDna7P-jXBhzV2pkvDFt1TPBSUPjin4pBYkWMvKsjaAhV5z4tZ8Md_lCxIKxVd6W7Zj3OQVaEdzDffkRhcansRi7bdXFU1ZQFofupfEAv2SaPWTWEr4pLgd-eOT-_9TAo4ItT7XOUeEvGZZHQ8LxrmN-KQntk2bi9Xj0hpEbm_TmZHjXlK0M6-ax5BXzi0iXCO-x0TjGJplX6cSYyeTt5n2ax9-bvwAlLWi4rNNKbMpOz5w2RymHlsM4WDNaBQ-QiTeA6gG3Ly1J5I5rzIY8isbgQu77HOfN7ugExI90qWP9CZtL8I8uRvyWWWCNP-CCIDsdo9YfwsdVYH2OYmmBVzRFGSwhJ0C2K5DjzzTBa5UJMoZJX6PhNnb-9uyVRzEvfXaXLOvrfXN2xDqm5xH6P_BcBYAjfFipkRXHtW471WI94Q6G7phMvYvI6dEhlNUe3q7LgFcNQmJzvt3F7q4bavRYcG1pAA4Q4tNw4MZuprAUPQzCWzgiM8XpTAij2OG-SvZCYPW8KO-04kuhNRjflHGooKpQY7n4OjySWUV0u6bemvIsxlt9Q7guYThEi_HOeRlH4A9Gm8V5lcYsP2_Fh1rAfHAsF6BKNvIFzArzDuZPJXFFxRXAVAqf-GlnsgzbM",
        })
        .expect(204);
    });
  });
});
