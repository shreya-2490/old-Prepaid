import React from 'react';
import { Card, Typography, Divider, Space } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ContactInfoCard = () => {
  return (
    <Card title="Contact Information">
      <Space direction="vertical">
        <div>
          <MailOutlined /> <Text strong>support@yourwebsite.com</Text>
        </div>
        <Divider />
        <div>
          <PhoneOutlined /> <Text strong>+1 123-456-7890</Text>
        </div>
        <Divider />
        <div>
          <EnvironmentOutlined /> <Text strong>123 Main St, City, Country</Text>
        </div>
      </Space>
    </Card>
  );
};

export default ContactInfoCard;
