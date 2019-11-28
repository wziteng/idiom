# 中华诗词小游戏接口文档
## 公共部分
* URL 接口：https://game.i--j.com/ (测试环境与正式环境暂时共用)
* 请求方式： POST
* 返回格式： JSON
* 返回JSON通则：  
`{"rt":true/false, "msg":"rt为false时的错误消息"}`
* 以下输出返回数据，仅对除"rt"和"msg"外的参数作出说明。


## 1.	根据openId获取用户基本资料
* 路径：/user/info
* 输入参数：open_id
* 返回数据：[ret].row

| 键名 | 类型 | 说明 |
| ------------- | ------------- | ------------- |
| id | int | 数据库表记录ID |
| open_id | string | 微信openId |
| union_id | string | 微信unionId |
| nick_name | string | 昵称 |
| avatar_url | string | 头像url |
| gender | int | 性别（1男，2女) |
| country | string | 国家 |
| province | string | 省份 |
| city | string | 城市 |
| level | int | 关卡分 |
| created_at | string | 记录初始插入时间 |


## 2.	上传用户基本资料
* 路径：/user/save
* 输入参数：

| 键名 | 类型 | 必填 | 说明 |
| -------- | ----- | ----- | ---- |
| open_id | string | 是 | 微信openId |
| union_id | string | 否 | 微信unionId |
| nick_name | string | 是 | 昵称 |
| avatar_url | string | 是 | 头像url |
| gender | int | 是 | 性别（1男，2女) |
| country | string | 是 | 国家 |
| province | string | 是 | 省份 |
| city | string | 是 | 城市 |
* 返回有效数据：无


## 3.	更新用户关卡分
* 路径：/user/level_save
* 输入参数：

| 键名 | 类型 | 必填 | 说明 |
| -------- | ----- | ----- | ---- |
| open_id | string | 是 | 微信openId |
| level | int | 是 | 关卡分 |
* 返回有效数据：无


## 4.	获取关卡json数据
* 路径：/level/get
* 输入参数：

| 键名 | 类型 | 必填 | 说明 |
| -------- | ----- | ----- | ---- |
| level_id | int | 是 | 获取的开始关数 |
| step | int | 否 | 获取几关的数据，缺省默认为1 |
* 返回有效数据：

| 键名 | 类型 | 说明 |
| ------------- | ------------- | ------------- |

