var WhiteList = artifacts.require('WhiteList')

contract('WhiteList', function (accounts) {

    // owner (or) admin account of StreamSpace
    const owner = accounts[0]

    //User Accounts
    const user_one_alice = accounts[1]
    const user_two_bob = accounts[2]

    const device_one_user_one_iphone = accounts[3]
    const device_two_user_one_desktop = accounts[4]
    const device_three_user_one_smarttv = accounts[5]

    const device_one_user_two_iphone = accounts[6]
    const device_two_user_two_desktop = accounts[7]
    const device_three_user_two_smarttv = accounts[8]
    const device_four_user_two_android = accounts[9]
    const device_five_user_two_berry = accounts[10]

    //Empty Address
    const emptyAddress = '0x0000000000000000000000000000000000000000'

    it("should add user to whitelist by admin account : Alice", async () => {
        const whitelist = await WhiteList.deployed()

        var eventEmitted = false

        const gasCost = await whitelist.addUserToWhitelist.estimateGas(user_one_alice, { from: owner })
        console.log("Estimated Gas cost for addUserToWhitelist() func: ", gasCost);

        const tx = await whitelist.addUserToWhitelist(user_one_alice, { from: owner })

        if (tx.logs[0].event === "UserWhiteListed") {
            eventEmitted = true
        }

        //const gasEstimate = await whitelist.addUserToWhitelist.estimateGas(user_three_cat, {from: owner});
        //console.log("Gas estimate for adding user to whitelist is", gasEstimate)

        assert.equal(tx.logs[0].args.owner.toString(), owner.toString(), 'the address of owner does not matched with address of account adds user to whitelist')
        assert.equal(tx.logs[0].args.userAddress.toString(), user_one_alice.toString(), 'the address of whitelisted account is not matching with address sent as argument')
        assert.equal(tx.logs[0].args.result, true, 'the result of adding user to whitelist is successful')
        assert.equal(eventEmitted, true, 'adding an item should emit UserWhiteListed event')
    })

    it("should add 1st device to whitelist by whitelisted user account : Alice - Device 1", async () => {
        const whitelist = await WhiteList.deployed()

        var eventEmitted = false

        const gasCost = await whitelist.addDevice.estimateGas(device_one_user_one_iphone, { from: user_one_alice })
        console.log("Estimated Gas Cost for addDevice() func: ", gasCost)


        const tx = await whitelist.addDevice(device_one_user_one_iphone, { from: user_one_alice })

        if (tx.logs[0].event === "DeviceWhiteListed") {
            eventEmitted = true
        }

        assert.equal(tx.logs[0].args.user.toString(), user_one_alice.toString(), 'the address of user one does not matched with address of account adds device to whitelist')
        assert.equal(tx.logs[0].args.deviceAddress.toString(), device_one_user_one_iphone.toString(), 'the address of whitelisted device is not matching with address sent as argument')
        assert.equal(tx.logs[0].args.result, true, 'the result of adding device to whitelist is successful')
        assert.equal(eventEmitted, true, 'adding an item should emit DeviceWhiteListed event')
    })

    it("should add 2nd device to whitelist by whitelisted user account : Alice - Device 2", async () => {
        const whitelist = await WhiteList.deployed()

        var eventEmitted = false

        const gasCost = await whitelist.addDevice.estimateGas(device_two_user_one_desktop, { from: user_one_alice })
        console.log("Estimated gas cost for adding 2nd Device addDevice() func : ", gasCost)

        const tx = await whitelist.addDevice(device_two_user_one_desktop, { from: user_one_alice })

        if (tx.logs[0].event === "DeviceWhiteListed") {
            eventEmitted = true
        }

        assert.equal(tx.logs[0].args.user.toString(), user_one_alice.toString(), 'the address of user one does not matched with address of account adds device to whitelist')
        assert.equal(tx.logs[0].args.deviceAddress.toString(), device_two_user_one_desktop.toString(), 'the address of whitelisted device is not matching with address sent as argument')
        assert.equal(tx.logs[0].args.result, true, 'the result of adding device to whitelist is successful')
        assert.equal(eventEmitted, true, 'adding an item should emit DeviceWhiteListed event')
    })

    it("should add 3rd device to whitelist by whitelisted user account : Alice - Device 3", async () => {
        const whitelist = await WhiteList.deployed()

        var eventEmitted = false

        const gasCost = await whitelist.addDevice.estimateGas(device_three_user_one_smarttv, { from: user_one_alice })
        console.log("Estimated gas cost for adding 3nd Device addDevice() func : ", gasCost)

        const tx = await whitelist.addDevice(device_three_user_one_smarttv, { from: user_one_alice })

        if (tx.logs[0].event === "DeviceWhiteListed") {
            eventEmitted = true
        }

        assert.equal(tx.logs[0].args.user.toString(), user_one_alice.toString(), 'the address of user one does not matched with address of account adds device to whitelist')
        assert.equal(tx.logs[0].args.deviceAddress.toString(), device_three_user_one_smarttv.toString(), 'the address of whitelisted device is not matching with address sent as argument')
        assert.equal(tx.logs[0].args.result, true, 'the result of adding device to whitelist is successful')
        assert.equal(eventEmitted, true, 'adding an item should emit DeviceWhiteListed event')
    })

    it("should display list of devices added under each user : Alice - ShowDevices", async () => {
        const whitelist = await WhiteList.deployed()

        //Added just for checking computation cost involved
        // const gasCost = await whitelist.showDevices.estimateGas(user_one_alice)
        // console.log("Estimated gas cost for displaying device list for user 1 showDevices() func : ", gasCost)

        const result = await whitelist.showDevices.call(user_one_alice)          //list of devices can be seen from any account
        console.log("   \n");
        console.log("-----------------------------------------------------------------");
        console.log("List of Devices whitelisted by", user_one_alice, ": \n");
        for (var i = 0; i < result.length; i++) {
            if (result[i].toString() != "0x0000000000000000000000000000000000000000") {
                console.log("Device", i + 1, ":", result[i].toString(), "\n")
            }
        }
        console.log("-----------------------------------------------------------------");
        console.log("   \n");
    })

    it("should add user to whitelist by admin account : Bob - WhiteListUser", async () => {
        const whitelist = await WhiteList.deployed()

        var eventEmitted = false

        const gasCost = await whitelist.addUserToWhitelist.estimateGas(user_two_bob, { from: owner })
        console.log("Estimated gas cost for adding user 2nd user addUserToWhitelist() func", gasCost)

        const tx = await whitelist.addUserToWhitelist(user_two_bob, { from: owner })

        if (tx.logs[0].event === "UserWhiteListed") {
            eventEmitted = true
        }

        assert.equal(tx.logs[0].args.owner.toString(), owner.toString(), 'the address of owner does not matched with address of account adds user to whitelist')
        assert.equal(tx.logs[0].args.userAddress.toString(), user_two_bob.toString(), 'the address of whitelisted account is not matching with address sent as argument')
        assert.equal(tx.logs[0].args.result, true, 'the result of adding user to whitelist is successful')
        assert.equal(eventEmitted, true, 'adding an item should emit UserWhiteListed event')
    })

    it("should add 1st device to whitelist by whitelisted 2nd user account : Bob - Device 1", async () => {
        const whitelist = await WhiteList.deployed()

        var eventEmitted = false

        const gasCost = await whitelist.addDevice.estimateGas(device_one_user_two_iphone, { from: user_two_bob })
        console.log("Estimated gas cost for adding 1st device of 2nd user (4th device) addDevice() func", gasCost)

        const tx = await whitelist.addDevice(device_one_user_two_iphone, { from: user_two_bob })

        if (tx.logs[0].event === "DeviceWhiteListed") {
            eventEmitted = true
        }

        assert.equal(tx.logs[0].args.user.toString(), user_two_bob.toString(), 'the address of user one does not matched with address of account adds device to whitelist')
        assert.equal(tx.logs[0].args.deviceAddress.toString(), device_one_user_two_iphone.toString(), 'the address of whitelisted device is not matching with address sent as argument')
        assert.equal(tx.logs[0].args.result, true, 'the result of adding device to whitelist is successful')
        assert.equal(eventEmitted, true, 'adding an item should emit DeviceWhiteListed event')
    })

    it("should add 2nd device to whitelist by whitelisted user account : Bob - Device 2", async () => {
        const whitelist = await WhiteList.deployed()

        var eventEmitted = false

        const gasCost = await whitelist.addDevice.estimateGas(device_two_user_two_desktop, { from: user_two_bob })
        console.log("Estimated gas cost for adding 2nd device of 2nd user (5th device) addDevice() func", gasCost)

        const tx = await whitelist.addDevice(device_two_user_two_desktop, { from: user_two_bob })

        if (tx.logs[0].event === "DeviceWhiteListed") {
            eventEmitted = true
        }

        assert.equal(tx.logs[0].args.user.toString(), user_two_bob.toString(), 'the address of user one does not matched with address of account adds device to whitelist')
        assert.equal(tx.logs[0].args.deviceAddress.toString(), device_two_user_two_desktop.toString(), 'the address of whitelisted device is not matching with address sent as argument')
        assert.equal(tx.logs[0].args.result, true, 'the result of adding device to whitelist is successful')
        assert.equal(eventEmitted, true, 'adding an item should emit DeviceWhiteListed event')
    })

    it("should add 3rd device to whitelist by whitelisted user account : Bob - Device 3", async () => {
        const whitelist = await WhiteList.deployed()

        var eventEmitted = false

        const gasCost = await whitelist.addDevice.estimateGas(device_three_user_two_smarttv, { from: user_two_bob })
        console.log("Estimated gas cost for adding 3rd device of 2nd user (6th device) addDevice() func", gasCost)


        const tx = await whitelist.addDevice(device_three_user_two_smarttv, { from: user_two_bob })

        if (tx.logs[0].event === "DeviceWhiteListed") {
            eventEmitted = true
        }

        assert.equal(tx.logs[0].args.user.toString(), user_two_bob.toString(), 'the address of user one does not matched with address of account adds device to whitelist')
        assert.equal(tx.logs[0].args.deviceAddress.toString(), device_three_user_two_smarttv.toString(), 'the address of whitelisted device is not matching with address sent as argument')
        assert.equal(tx.logs[0].args.result, true, 'the result of adding device to whitelist is successful')
        assert.equal(eventEmitted, true, 'adding an item should emit DeviceWhiteListed event')
    })

    it("should display list of devices added under each user : Bob - ShowDevices", async () => {
        const whitelist = await WhiteList.deployed()

        // const gasCost = await whitelist.showDevices.estimateGas(user_two_bob)
        // console.log("Estimated gas cost for displaying device list for user 2 showDevices() func : ", gasCost)

        const result = await whitelist.showDevices.call(user_two_bob)          //list of devices can be seen from any account
        console.log("   \n");
        console.log("-----------------------------------------------------------------");
        console.log("List of Devices whitelisted by", user_one_alice, ": \n");
        for (var i = 0; i < result.length; i++) {
            if (result[i].toString() != "0x0000000000000000000000000000000000000000") {
                console.log("Device", i + 1, ":", result[i].toString(), "\n")
            }
        }
        console.log("-----------------------------------------------------------------");
        console.log("   \n");
    })

    it("should find owner of 3rd device of 1st user : Alice - Device 3 - findDeviceOwner", async () => {
        const whitelist = await WhiteList.deployed()

        // const gasCost = await whitelist.findDeviceOwner.estimateGas(device_three_user_one_smarttv)
        // console.log("Estimated Gas to find owner of 3rd Device of 1st User", gasCost)

        const deviceOwner = await whitelist.findDeviceOwner.call(device_three_user_one_smarttv)

        assert.equal(deviceOwner.toString(), user_one_alice.toString(), 'the address of device owner is not fetched')
    })


    it("should find owner of 2nd device of 2nd user : Bob - Device 2 - findDeviceOwner", async () => {
        const whitelist = await WhiteList.deployed()

        // const gasCost = await whitelist.findDeviceOwner.estimateGas(device_two_user_two_desktop)
        // console.log("Estimated Gas to find owner of 2nd Device of 2nd User", gasCost)

        const deviceOwner = await whitelist.findDeviceOwner.call(device_two_user_two_desktop)

        assert.equal(deviceOwner.toString(), user_two_bob.toString(), 'the address of device owner is not fetched')
    })


    it("should remove 2nd device whitelisted user account : Alice - Device 2", async () => {
        const whitelist = await WhiteList.deployed()

        var eventEmitted = falseDeviceRemoved

        const gasCost = await whitelist.removeDevice.estimateGas(device_two_user_one_desktop, { from: user_one_alice })
        console.log("Estimated Gas to remove 2nd device from user 1 removeDevice() func", gasCost)

        const tx = await whitelist.removeDevice(device_two_user_one_desktop, { from: user_one_alice })

        if (tx.logs[0].event === "DeviceRemoved") {
            eventEmitted = true
        }

        assert.equal(tx.logs[0].args.user.toString(), user_one_alice.toString(), 'the address of user one does not matched with address of account adds device to whitelist')
        assert.equal(tx.logs[0].args.deviceAddress.toString(), device_two_user_one_desktop.toString(), 'the address of device is not matching with address sent as argument')
        assert.equal(tx.logs[0].args.result, true, 'the result of removing device from whitelist is successful')
        assert.equal(eventEmitted, true, 'adding an item should emit DeviceRemoved event')
    })

    it("should display list of devices after removal of 2nd Device : Alice - ShowDevices", async () => {
        const whitelist = await WhiteList.deployed()

        // const gasCost = await whitelist.showDevices.estimateGas(user_one_alice)
        // console.log("Estimated gas cost for displaying device list for user 1 after removal of 2nd device showDevices() func : ", gasCost)

        const result = await whitelist.showDevices.call(user_one_alice)          //list of devices can be seen from any account
        console.log("   \n");
        console.log("-----------------------------------------------------------------");
        console.log("List of Devices (after removal of 2nd device) whitelisted by", user_one_alice, ": \n");
        for (var i = 0; i < result.length; i++) {
            if (result[i].toString() != "0x0000000000000000000000000000000000000000") {
                console.log("Device", i + 1, ":", result[i].toString(), "\n")
            }
        }
        console.log("-----------------------------------------------------------------");
        console.log("   \n");
    })

    it("should not find owner of 2rd device of 1st user : Alice - Device 2 - findDeviceOwner", async () => {
        const whitelist = await WhiteList.deployed()

        
        // const gasCost = await whitelist.findDeviceOwner.call.estimateGas(device_two_user_one_desktop)
        // console.log("Estimated Gas to find owner of 2nd Device of 1st User", gasCost)

        const deviceOwner = await whitelist.findDeviceOwner.call(device_two_user_one_desktop)

        assert.equal(deviceOwner.toString(), user_one_alice.toString(), 'the address of device owner is not fetched')
    })

    it("should remove 1st user and his devices:  Alice - Remove user", async () => {
        const whitelist = await WhiteList.deployed()

        var eventEmitted = false

        

        const gasCost = await whitelist.removeWhitelistedUser.estimateGas(user_one_alice, { from: owner })
        console.log("Estimated Gas to remove user 1 removeWhitelistedUser() func", gasCost)

        const tx = await whitelist.removeWhitelistedUser(user_one_alice, { from: owner })
        DeviceRemovedDeviceRemoved
        if (tx.logs[0].event === "UserRemoved") {
            eventEmitted = true
        }

        assert.equal(tx.logs[0].args.owner.toString(), owner.toString(), 'the address of owner does not matched with address of account removes user to whitelist')
        assert.equal(tx.logs[0].args.userAddress.toString(), user_one_alice.toString(), 'the address of user is not matching with address sent as argument')
        assert.equal(tx.logs[0].args.result, true, 'the result of removing user from whitelist is successful')
        assert.equal(eventEmitted, true, 'adding an item should emit DeviceRemoved event')
    })

    it("should not display list of devices after removal of User : Alice - ShowDevices", async () => {
        const whitelist = await WhiteList.deployed()

        // const gasCost = await whitelist.showDevices.estimateGas(user_one_alice)
        // console.log("Estimated gas cost for displaying device list for user 1 after removal of user1 showDevices() func : ", gasCost)


        const result = await whitelist.showDevices.call(user_one_alice)          //list of devices can be seen from any account
        console.log("   \n");
        console.log("-----------------------------------------------------------------");
        console.log("List of Devices (after removal of user) whitelisted by", user_one_alice, ": \n");
        for (var i = 0; i < result.length; i++) {
            if (result[i].toString() != "0x0000000000000000000000000000000000000000") {
                console.log("Device", i + 1, ":", result[i].toString(), "\n")
            }
        }
        console.log("-----------------------------------------------------------------");
        console.log("   \n");
    })


    it("can't remove user that is already delisted:  Alice - Remove user", async () => {
        const whitelist = await WhiteList.deployed()

        var eventEmitted = false

        

        const gasCost = await whitelist.removeWhitelistedUser.estimateGas(user_one_alice, { from: owner })
        console.log("Estimated Gas to remove user 1 that is already removed removeWhitelistedUser() func", gasCost)

        const tx = await whitelist.removeWhitelistedUser(user_one_alice, { from: owner })

        if (tx.logs[0].event === "UserRemoved") {
            eventEmitted = true
        }

        assert.equal(tx.logs[0].args.owner.toString(), owner.toString(), 'the address of owner does not matched with address of account removes user to whitelist')
        assert.equal(tx.logs[0].args.userAddress.toString(), user_one_alice.toString(), 'the address of user is not matching with address sent as argument')
        assert.equal(tx.logs[0].args.result, true, 'the result of removing user from whitelist is successful')
        assert.equal(eventEmitted, true, 'adding an item should emit DeviceRemoved event')
    })

    it("can't add 4th device to whitelist by whitelisted user account : Bob - Device 4", async () => {
        const whitelist = await WhiteList.deployed()

        var eventEmitted = false

        
        const gasCost = await whitelist.addDevice.estimateGas(device_four_user_two_android, { from: user_two_bob })
        console.log("Estimated gas cost for adding 4th device of 2nd user (4th device) addDevice() func", gasCost)

        const tx = await whitelist.addDevice(device_four_user_two_android, { from: user_two_bob })

        if (tx.logs[0].event === "DeviceWhiteListed") {
            eventEmitted = true
        }

        assert.equal(tx.logs[0].args.user.toString(), user_two_bob.toString(), 'the address of user one does not matched with address of account adds device to whitelist')
        assert.equal(tx.logs[0].args.deviceAddress.toString(), device_four_user_two_android.toString(), 'the address of whitelisted device is not matching with address sent as argument')
        assert.equal(tx.logs[0].args.result, true, 'the result of adding device to whitelist is successful')
        assert.equal(eventEmitted, true, 'adding an item should emit DeviceWhiteListed event')
    })
});