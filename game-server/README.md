# �л�ʫ��С��Ϸ�ӿ��ĵ�
## ��������
* URL �ӿڣ�https://game.i--j.com/ (���Ի�������ʽ������ʱ����)
* ����ʽ�� POST
* ���ظ�ʽ�� JSON
* ����JSONͨ��  
`{"rt":true/false, "msg":"rtΪfalseʱ�Ĵ�����Ϣ"}`
* ��������������ݣ����Գ�"rt"��"msg"��Ĳ�������˵����


## 1.	����openId��ȡ�û���������
* ·����/user/info
* ���������open_id
* �������ݣ�[ret].row

| ���� | ���� | ˵�� |
| ------------- | ------------- | ------------- |
| id | int | ���ݿ���¼ID |
| open_id | string | ΢��openId |
| union_id | string | ΢��unionId |
| nick_name | string | �ǳ� |
| avatar_url | string | ͷ��url |
| gender | int | �Ա�1�У�2Ů) |
| country | string | ���� |
| province | string | ʡ�� |
| city | string | ���� |
| level | int | �ؿ��� |
| created_at | string | ��¼��ʼ����ʱ�� |


## 2.	�ϴ��û���������
* ·����/user/save
* ���������

| ���� | ���� | ���� | ˵�� |
| -------- | ----- | ----- | ---- |
| open_id | string | �� | ΢��openId |
| union_id | string | �� | ΢��unionId |
| nick_name | string | �� | �ǳ� |
| avatar_url | string | �� | ͷ��url |
| gender | int | �� | �Ա�1�У�2Ů) |
| country | string | �� | ���� |
| province | string | �� | ʡ�� |
| city | string | �� | ���� |
* ������Ч���ݣ���


## 3.	�����û��ؿ���
* ·����/user/level_save
* ���������

| ���� | ���� | ���� | ˵�� |
| -------- | ----- | ----- | ---- |
| open_id | string | �� | ΢��openId |
| level | int | �� | �ؿ��� |
* ������Ч���ݣ���


## 4.	��ȡ�ؿ�json����
* ·����/level/get
* ���������

| ���� | ���� | ���� | ˵�� |
| -------- | ----- | ----- | ---- |
| level_id | int | �� | ��ȡ�Ŀ�ʼ���� |
| step | int | �� | ��ȡ���ص����ݣ�ȱʡĬ��Ϊ1 |
* ������Ч���ݣ�

| ���� | ���� | ˵�� |
| ------------- | ------------- | ------------- |

