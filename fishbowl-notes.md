# Fishbowl Notes

## Overview

Fishbowl is an ERP aimed at small to mid-size enterprises. Its capability set includes typical ERP functionality across inventory management, sales and purchase orders, logistics records, invoicing and customer data management.

Fishbowl consists of a client application installed on user machines, and a central database that all of the clients connect to. The underlying database engine is a MySQL 5.6 database that is hosted internally in Unios’ Perth server room. Fishbowl is maintained and administrated by the operations team, in particular, Kah and Jun. They manage all upgrades, deployments, backups, migrations and general system administration duties.

Fishbowl was first introduced at Unios some years ago, and, as at May 2022, the company has begun to outgrow the system’s capability set. Discussions surrounding the possibility of migrating toward a more modern, performant (_Damon’s note_: and ideally cloud-based) solution happen frequently.

### A note about Unios Regions

Unios’ operations span multiple business regions: Australia (AU), Vietnam (VN), China (CN), South Korea (KR) and another region, International (INTL), which generally operates out of Singapore. An ideal ERP solution for Unios would be capable of presenting both global and regional views of inventory, distribution, sales, etc.

Out-of-the-box, Fishbowl does not have a native solution that aligns well to this requirement. To work around this, the operations team have set up multiple instances of the fishbowl database - one per region - each exposed on a different TCP/IP port. Client applications are deployed with configurations to connect to the appropriate database for their region.

Whilst not ideal, this approach has been sufficient for Unios to date. Klipfolio, an external service, has been able to provide Unios management with some degree of global-data-view via ETL reporting.

With the exception of the China region, all of the region database instances are hosted in the Unios Perth HQ server room (the China DB is hosted in China due to latency issues resulting from the Great Firewall).

## Software Development with Fishbowl

### Native Fishbowl API

Fishbowl is a closed application with only an extremely limited developer API available for integration. You can find (some very poor) documentation for the native API here:

https://help.fishbowlinventory.com/hc/en-us/articles/360042629914-Fishbowl-API

Put simply, the native integration allows systems to invoke some Fishbowl operations using a XML SOAP interface. The ‘Legacy’ API that is mentioned in the documentation does appear to provide access to more functionality, but I would ultimately advise against investing any effort to write code against the native API.

### Client Libraries

We aware of at least two client libraries that can be used to “integrate” with Fishbowl. In each case, the client library is simply a language-specific wrappers around the native API, although some minor process streamlining is evident (e.g. authenticating to perform operations is fully encapsulated).

#### ILC Fishbowl Client

Israel Lopez Consulting (ILC) provide a C# library for integration with Fishbowl. **_We have purchased and own a perpetual license for this library_**, which entitles us to use the library in production and gain access to all future updates of the client library. Copies of the library binaries are stored on the file server here: TODO

A proof of concept for the use of this library exists in the following repository:

https://github.com/unioslight/fishbowl-connection-spike

Also, the (very rough) OMNI prototype demonstrates its use in a .Net Core API project:

https://github.com/unioslight/omni-prototype

It is anticipated that this library may be used in the future to perform batch ‘write’ operations to Fishbowl instances (most likely via a C# lambda function on AWS, or similar).

Our local (Australia-based) contact for ILC is Inder Singh, a software developer based in Queensland. Updated versions of the library can be requested by contacting him directly at [inder@israellopezconsulting.com](mailto:inder@israellopezconsulting.com).

On a side-note, the operation team have engaged ILC multiple times in the past to made custom additions to the Fishbowl client. The relationship between ILC and the Unios operations team is, as far as I have been able to tell, tenuous at best...

#### fishbowl-js

A native JavaScript library exists on GitHub and can be found here:

https://github.com/BrennenRocks/fishbowl-js

This repository is not actively developed and appears to be limited in its capability set, however there are some very useful functions available here and it could serve as the basis for additional development to access Fishbowl capability.

### Drawbacks of using Fishbowl API or Client Libraries

Unfortunately, there are some severe limitations that arise from using either the Native API or the aforementioned client libraries. As the Fishbowl system itself is highly ACID-transaction oriented, the exposed functionality expects consuming systems to behave in the same manner. Put simply, interaction via the Native API or Client Libraries is expected to be:

- Sequential
- Synchronous
- Single-threaded

Such a model will not always fit well with the web-based, multi-user applications that are being developed by the Digital Products team at Unios.

Perhaps the most significant drawback, however, is that using these clients leverages the Fishbowl authentication mechanism. Putting this plainly again:

- Any invoked operation requires an authenticated session with Fishbowl
- Following that, any dedicated logins require the purchase of additional license seats
- Fishbowl authentication locks users down to single-session logins (and there is a very nasty behaviour in which a subsequent login attempt to an already authenticated session locks/freezes the user account temporarily)

As a result of these drawbacks, we have explored alternative methods for accessing ERP data under control of the Fishbowl system.

### Connecting to the Fishbowl database

As previously mentioned, the Fishbowl ecosystem consists of a client application, server-side application harness, and an underlying MySQL 5.6 database. Since the database engine is installed to run in an isolated process, it is possible for applications to connect directly to the Fishbowl underlying database. (_Damon’s note_: whether this is intended/deliberate or simply an oversight on the part of Fishbowl’s developers, I am note sure, however we can use it to our advantage nonetheless).

In evaluating the efficacy of this approach, we have determined the following list of Pros and Cons:

#### Pros

- bypass application authentication, thereby eliminating need to purchase seats for each application requiring access to ERP data
- ability to use raw SQL to optimise view of data (i.e. query and return _only_ what is needed in the shape that it is needed)
- No need to rely on external development effort (which is the case with the ILC client library, noting that ILC are notoriously slow to act)

#### Cons

- inherent risk associated with direct-db data access (this can be managed by using read-only connections only)
- complicated database schema to understand (current understandings documented below)
- additional database server load (in reality, this is negligible)

Generally speaking, we have adopted this approach when needing to access ERP data, however we are consciously limiting the surface of exposure of this ‘_Fishbowl hack_’ by restricting its use to a single data-collation/warehousing system, called Looking Glass, and also employing direct-to-db access for read-only use.

### Looking Glass

The Looking Glass project has been created to meet the following objectives:

- provide a view of (reasonably) up-to-date ERP data that can be consumed by other applications and, in doing so, thereby limit the number of applications that need direct-to-db access to Fishbowl data
- establish foundational data warehousing capability that can be used for reporting purposes
- enable a consolidated global view of data by extracting data from all regional Fishbowl instances
- provide an alternate source of ERP data for external services (such as Klipfolio and Salesforce) so that these systems need not place additional burden on our already struggling Fishbowl server processes

Any future application development that will require ERP data from Fishbowl should be designed with the Looking Glass system and its core purpose in mind.

The Looking Glass project can be found here:

https://github.com/unioslight/looking-glass

## Understanding the Fishbowl database

At first glance, the Fishbowl database might be quite intimidating due to the sheer number of tables and views that exist. The good news is that the database is very consistent in its use of standard relational-database conventions and some application-specific design conventions. Once these conventions are understood, you will see that the database is actually very easy to digest and interpret.

### Design Conventions

#### Audit Tables

Probably the first thing you will notice after inspecting the database objects is that there are a lot of tables named with the suffix `_aud`. These tables are audit logs for the corresponding table whose name matches the part preceding the suffix. For example, `customer_aud` is the audit log for the `customer` table; `product_aud` is the audit log for the `product` table, etc.

Fishbowl auditing works by tracking matching record structures from the source table with an additional revision attribute. While this may be useful for future data-debugging efforts, in practice, we can ignore these tables.

#### Multi-level Relationships

Some aspects of the Fishbowl system allow that concepts can be applied at different levels of abstraction. For example, Fishbowl has the concepts of a Customer and corresponding Account, but also has the concepts of Account Type and Account Groups. Hypothetically, we could imagine a particular pricing rule being applied either directly to a customer, to customers of a particular type, or to customers within a particular customer group. At various places in the Fishbowl database, we can see evidence of design that is intended to support this type of flexibility.

In addition to standard, direct foreign-key references, the Fishbowl database also leverages `*incltype` tables and fields to achieve data inclusion (association/relationship) at varying levels. A good example of this can be seen in the `pricingrules` table which has the following fields:

- _id_: primary key of the table
- _userId_: foreign key to the users table, indicating the user that created the pricing rule
- _customerInclTypeId_: foreign key to the `customerincltype` table, indicating the level at which to apply the pricing rule to customers. Checking the contents of the `customerincltype` table, we see that there are three possible levels that the rule could be applied at:
  - _“All”_: applies to all customers
  - _“Customer”_: a specific customer
  - _“Customer Group”_: all customers in a specific customer group
- _customerInclId_: foreign key to the relevant entity that corresponds to the option selected in `customerInclTypeId`:
  - When `customerInclTypeId` links to the ‘All’ record, `customerInclId` should be null
  - When `customerInclTypeId` links to the ‘Customer’ record, `customerInclId` will link to the `customer` table
  - When `customerInclTypeId` links to the ‘Customer Group’ record, `customerInclId` will link to the `customergroup` table
- _productInclTypeId_: foreign key to the `productincltype` table, indicating the level at which a pricing rule is applicable to products. Checking the contents of the `productincltype` table, we see that there are four possible levels that the rule could be aplied atL
  - _“All”_: applies to all products
  - “_Part Category_”: all products that fall within a particular part category
  - “_Product_”: a specific product
  - “_Product Tree_”: all products that fall below a particular node in the product tree
- _productInclId_: foreign key to the relevant entity that corresponds to the option selected in `productInclTypeId`:
  - When `productInclTypeId` links to the ‘All’ record, `productInclId` should be null
  - When `productInclTypeId` links to the ‘Part Category’ record, `productInclId` will link to the `partcategory` table
  - When `productInclTypeId` links to the ‘Product’ record, `productInclId` will link to the `product` table
  - When `productInclTypeId` links to the ‘Product Tree’ record, `productInclId` will link to the `producttree` table

#### Custom Fields

In the past, consultants (including ILC) have been engaged to add custom fields to the Fishbowl client application interface. Under the hood, these fields are generally backed by a JSON `customFields` column (understandably, a flexible construct such as JSON makes this highly customisable). The custom fields will generally include attributes for the visible display fields, as well as the value that the field holds.

The most significant example of this can be found in the `products` table. Here, we can dig into the `customFields` column to extract values for:

- stockMode
- leadTime
- locationMaxQty
- cartonSize
- which regions to sync the product data to

### Key Data Realms

#### Customer Data

The key tables for customer data are:

- _customer_: holds customer profile data
- _account_: links a customer record to an account type
- _accounttype_: a mechanism for account categorisation
- _accountgroup_: a mechanism for grouping accounts for the purpose of batch-applying pricing rules
- _accountgrouprelation_: links an account group to an account record

The following is an indicative SQL query drawing data from these tables:

```sql
-- returns customer details
select
    c.id  as "customerId",
    c.name as "customerName",
    at.name as "accountType",
    group_concat(ag.name) as "accountGroup"
from customer c
inner join account a on a.id = c.accountId
inner join accounttype at on at.id = a.typeId
left join accountgrouprelation agr on agr.accountId = a.id
left join accountgroup ag on ag.id = agr.groupId
group by c.id;
```

#### Product Data

The key tables for product data are:

- _product_: holds details for products to be sold
- _part_: corresponding part data for products (all product records will have a corresponding part record - in many cases the data between these two records is duplicated)
- _producttree_: a mechanism for categorising products
- _producttotree_: maps products to categories in the product tree (note that products may belong to multiple categories within the product tree)

The following is an indicative SQL query drawing data from these tables:

```sql
-- returns products that have more than a single product category
select
  p.id as "productId",
  p.num as "productCode",
  coalesce(p.description, prt.description) as "productName",
  group_concat(pt.name) as "category",
  coalesce(p.customFields->>'$."2"."value"', 'Assembled') as "stockMode"
from product p
inner join part prt on prt.id = p.partId
left join producttotree p2t on p2t.productId = p.id
left join producttree pt on pt.id = p2t.productTreeId
group by p.id having count(pt.id) > 1;
```

#### Additional Examples

A number of useful queries that explore the Fishbowl database schema can be found in the Looking Glass project.
