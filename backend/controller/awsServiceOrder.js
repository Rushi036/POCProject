const AwsServiceOrder = require('../model/awsServiceOrder.js')
const response = require("../response/response.js");

// Route to get details for all the business entities
exports.getAwsOrders = async (req, res) => {
    try {
        const orderRec = await AwsServiceOrder.find()
        res.status(200).json(response.createSuccess(orderRec));
    } catch (error) {
        res.status(400).json(response.createError("Something went wrong!"));
    }
};

exports.addAwsOrders = async (req, res) => {
    console.log(req.body)
    const { cloud, ami, instance_type, name, key_name, monitoring, vpc_security_group_ids, subnet_id, cpu_core_count, cpu_threads_per_core, cpu_credits, disable_api_termination, kms_key_id, snapshot_id, source_dest_check, create_spot_instance, iam_instance_profile, ebs_optimized, enable_volume_tags, hibernation, ipv6_address_count, ipv6_addresses, launch_template, private_ip, tenancy, Environment, device_name, volume_type, volume_size, delete_on_termination, encrypted, iops, role_name, availability_zone, associate_public_ip_address, ApplicationName, ApplicationOwner, EmailID, Business, target_group_arn, target_id, port, status, approved, provisioned, order_created_at, provisioned_at, ec2_instance_id, ec2_public_ip, ec2_pem_path } = req.body;

    const AwsRec = new AwsServiceOrder({
        cloud: cloud,
        ami: ami,
        instance_type: instance_type,
        name: name,
        key_name: key_name,
        monitoring: monitoring,
        vpc_security_group_ids: vpc_security_group_ids,
        subnet_id: subnet_id,
        cpu_core_count: cpu_core_count,
        cpu_threads_per_core: cpu_threads_per_core,
        cpu_credits: cpu_credits,
        disable_api_termination: disable_api_termination,
        kms_key_id: kms_key_id,
        snapshot_id: snapshot_id,
        source_dest_check: source_dest_check,
        create_spot_instance: create_spot_instance,
        iam_instance_profile: iam_instance_profile,
        ebs_optimized: ebs_optimized,
        enable_volume_tags: enable_volume_tags,
        hibernation: hibernation,
        ipv6_address_count: ipv6_address_count,
        ipv6_addresses: ipv6_addresses,
        launch_template: launch_template,
        private_ip: private_ip,
        tenancy: tenancy,
        Environment: Environment,
        device_name: device_name,
        volume_type: volume_type,
        volume_size: volume_size,
        delete_on_termination: delete_on_termination,
        encrypted: encrypted,
        iops: iops,
        role_name: role_name,
        availability_zone: availability_zone,
        associate_public_ip_address: associate_public_ip_address,
        ApplicationName: ApplicationName,
        ApplicationOwner: ApplicationOwner,
        EmailID: EmailID,
        Business: Business,
        target_group_arn: target_group_arn,
        target_id: target_id,
        port: port,
        status: status,
        approved: approved,
        provisioned: provisioned,
        order_created_at: order_created_at,
        provisioned_at: provisioned_at,
        ec2_instance_id: ec2_instance_id,
        ec2_public_ip: ec2_public_ip,
        ec2_pem_path: ec2_pem_path
    });
    await AwsRec.save()
    res.status(201).json(response.createSuccess(AwsRec))
};

exports.getSingleAwsOrder = async (req, res) => {
    // console.log(req.params)
    const id = req.params.id
    if (id == null) {
        res.json("Id is null")
    } else {
        const orderDetails = await AwsServiceOrder.findById(id)
        res.status(200).json(response.createSuccess(orderDetails))
    }
}