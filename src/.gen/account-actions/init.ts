import * as accessControl from "./access-control/structs";
import * as config from "./config/structs";
import * as currency from "./currency/structs";
import * as kiosk from "./kiosk/structs";
import * as owned from "./owned/structs";
import * as transfer from "./transfer/structs";
import * as treasury from "./treasury/structs";
import * as upgradePolicies from "./upgrade-policies/structs";
import * as version from "./version/structs";
import * as vesting from "./vesting/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(version.V1);
loader.register(accessControl.Borrow);
loader.register(accessControl.AccessAction);
loader.register(accessControl.AccessProposal);
loader.register(accessControl.CapKey);
loader.register(accessControl.LockCommand);
loader.register(upgradePolicies.LockCommand);
loader.register(upgradePolicies.RestrictAction);
loader.register(upgradePolicies.RestrictProposal);
loader.register(upgradePolicies.UpgradeAction);
loader.register(upgradePolicies.UpgradeCapKey);
loader.register(upgradePolicies.UpgradeProposal);
loader.register(upgradePolicies.UpgradeRules);
loader.register(upgradePolicies.UpgradeRulesKey);
loader.register(config.ConfigDepsAction);
loader.register(config.ConfigDepsProposal);
loader.register(config.ConfigMetadataAction);
loader.register(config.ConfigMetadataProposal);
loader.register(vesting.ClaimCap);
loader.register(vesting.Stream);
loader.register(vesting.VestingAction);
loader.register(transfer.TransferAction);
loader.register(owned.PayProposal);
loader.register(owned.TransferProposal);
loader.register(owned.WithdrawAction);
loader.register(currency.LockCommand);
loader.register(currency.PayProposal);
loader.register(currency.TransferProposal);
loader.register(currency.BurnAction);
loader.register(currency.BurnProposal);
loader.register(currency.CurrencyRules);
loader.register(currency.CurrencyRulesKey);
loader.register(currency.DisableAction);
loader.register(currency.DisableProposal);
loader.register(currency.MintAction);
loader.register(currency.MintProposal);
loader.register(currency.TreasuryCapKey);
loader.register(currency.UpdateAction);
loader.register(currency.UpdateProposal);
loader.register(kiosk.DelistCommand);
loader.register(kiosk.KioskCommand);
loader.register(kiosk.KioskOwnerKey);
loader.register(kiosk.ListAction);
loader.register(kiosk.ListProposal);
loader.register(kiosk.PlaceCommand);
loader.register(kiosk.TakeAction);
loader.register(kiosk.TakeProposal);
loader.register(treasury.PayProposal);
loader.register(treasury.TransferProposal);
loader.register(treasury.DepositCommand);
loader.register(treasury.SpendAction);
loader.register(treasury.Treasury);
loader.register(treasury.TreasuryCommand);
loader.register(treasury.TreasuryKey);
 }
