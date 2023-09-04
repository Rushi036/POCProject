const mongoose = require("mongoose");

const azureServiceOrderSchema = mongoose.Schema({
    cloud: String,
    resource_group_name: String,
    location: String,
    virtual_network_name: String,
    virtual_network_address_space: [String],
    subnet_name: String,
    subnet_address_prefixes: [String],
    public_ip_name: Boolean,
    network_interface_name: String,
    vm_name: String,
    vm_admin_username: String,
    vm_admin_password: String,
    image_publisher: String,
    image_offer: String,
    image_sku: String,
    image_version: String,
    os_disk_name: String,
    os_disk_caching: String,
    os_disk_create_option: String,
    os_disk_managed_disk_type: String,
    size: String,
    key_name: String,
    status: String,
    approved: String,
    provisioned: String,
    order_created_at: String,
    provisioned_at: String,
});

module.exports = mongoose.model("azureserviceorder", azureServiceOrderSchema);