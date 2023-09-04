const AzureServiceOrder = require('../model/azureServiceOrder.js')
const response = require("../response/response.js");

// Route to get details for all the business entities
exports.getAzureOrders = async (req, res) => {
    try {
        const orderRec = await AzureServiceOrder.find()
        res.status(200).json(response.createSuccess(orderRec));
    } catch (error) {
        res.status(400).json(response.createError("Something went wrong!"));
    }
};

exports.addAzureOrders = async (req, res) => {
    console.log(req.body)
    const { cloud, resource_group_name, location, virtual_network_name, virtual_network_address_space, subnet_name, subnet_address_prefixes, public_ip_name, network_interface_name, vm_name, vm_admin_username, vm_admin_password, image_publisher, image_offer, image_sku, image_version, os_disk_name, os_disk_caching, os_disk_create_option, os_disk_managed_disk_type, size, key_name, status, approved, provisioned, order_created_at, provisioned_at } = req.body;

    const AzureRec = new AzureServiceOrder({
        cloud: cloud,
        resource_group_name: resource_group_name,
        location: location,
        virtual_network_name: virtual_network_name,
        virtual_network_address_space: virtual_network_address_space,
        subnet_name: subnet_name,
        subnet_address_prefixes: subnet_address_prefixes,
        public_ip_name: public_ip_name,
        network_interface_name: network_interface_name,
        vm_name: vm_name,
        vm_admin_username: vm_admin_username,
        vm_admin_password: vm_admin_password,
        image_publisher: image_publisher,
        image_offer: image_offer,
        image_sku: image_sku,
        image_version: image_version,
        os_disk_name: os_disk_name,
        os_disk_caching: os_disk_caching,
        os_disk_create_option: os_disk_create_option,
        os_disk_managed_disk_type: os_disk_managed_disk_type,
        size: size,
        key_name: key_name,
        status: status,
        approved: approved,
        provisioned: provisioned,
        order_created_at: order_created_at,
        provisioned_at: provisioned_at
    });
    await AzureRec.save()
    res.status(201).json(response.createSuccess(AzureRec))
};

exports.getSingleAzureOrder = async (req, res) => {
    // console.log(req.params)
    const id = req.params.id
    if (id == null) {
        res.json("Id is null")
    } else {
        const orderDetails = await AzureServiceOrder.findById(id)
        res.status(200).json(response.createSuccess(orderDetails))
    }
}