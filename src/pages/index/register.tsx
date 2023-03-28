import { Button, Modal, Checkbox, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined, TeamOutlined } from '@ant-design/icons';
import { UserServices } from '@/services';
import styles from './register.less';

interface IProps {
    visible: boolean,
    closeModal: any
}

export default function Index(props: IProps) {
    const [form] = Form.useForm();

    const handleOk = () => {
        props.closeModal();
    };

    const handleCancel = () => {
        props.closeModal()
    };


    function register() {
        form.validateFields()
            .then(async (values) => {
                if (!values.userName) {
                    message.error('请输入用户名!')
                } else if (!values.password) {
                    message.error('请输入密码!')
                } else {
                    const res = await UserServices.register({ ...values, role: values.role ? 'admin' : null });
                    if (res.code === 0 && res.data) {
                        message.success('注册成功！')
                        props.closeModal();
                    }
                }
            })
            .catch((errorInfo) => {
                console.log(errorInfo, 'errorInfo')
            });
    }
    return (
        <Modal
            className={styles['register-bg']}
            // style={{backgroundImage: `url(${backgroundImg})`,}}
            width={500}
            open={props.visible}
            onOk={handleOk}
            onCancel={() => handleCancel()}
            footer={null}>
            <Form
                form={form}
                name="basic"
                className={styles['register-form']}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                style={{ maxWidth: 600 }}
                autoComplete="off"
            >
                <Form.Item
                    label={<UserOutlined style={{ fontSize: 24 }} className={styles['login-form-icon']} />}
                    name="userName"
                // rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input className={styles['login-form-input']} size="large" />
                </Form.Item>
                <Form.Item
                    label={<LockOutlined style={{ fontSize: 24 }} className={styles['login-form-icon']} />}
                    name="password"
                // rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input className={styles['login-form-input']} type="password" size="large" />
                </Form.Item>
                <Form.Item
                    label={<TeamOutlined style={{ fontSize: 24 }} className={styles['login-form-icon']} />}
                    name="role"
                    valuePropName="checked"
                >
                    <Checkbox >管理员</Checkbox> 
                </Form.Item>
                <div className={styles['register-btn-box']}>
                    <Button className={styles['register-btn']} onClick={() => register()}>注册</Button>
                </div>
            </Form>
        </Modal>
    );
}
