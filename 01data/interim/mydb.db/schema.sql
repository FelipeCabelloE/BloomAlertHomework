


CREATE TABLE companies(organization VARCHAR, zone_id BIGINT, "zone" VARCHAR, polygon_decoded VARCHAR, "last7daysmean_CHL-01" DOUBLE, "last7daysmean_SPM-01" DOUBLE, "mean_CHL-01" DOUBLE, "mean_SPM-01" DOUBLE, "last7daysvar_CHL-01" DOUBLE, "last7daysvar_SPM-01" DOUBLE, "nullto_nonnull_CHL-01" DOUBLE, "nullto_nonnull_SPM-01" DOUBLE);
CREATE TABLE timeseries_dataset("timestamp" DATE, variable VARCHAR, organization VARCHAR, "value" DOUBLE, ingestion_time DATE);




