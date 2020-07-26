import React, { useEffect, useState } from "react";
import Proptypes from "prop-types";
// import Kpi from "../../components/kpi";
import { maybeIntlNumberFormat } from "../../i18n";
import { useTranslation } from "react-i18next";

const KpiContainer = ({ data }) => {
  const [drawData, setDrawData] = useState([]);
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    const { totals, totalsDiff } = data;
    const formatNumber = maybeIntlNumberFormat(language);
    const confirmed = {
      id: "confirmed",
      label: "Confirmed",
      value: formatNumber(totals.confirmed),
      diff: formatNumber(totalsDiff.confirmed),
      chartName: "confirmed_daily_avg.svg",
      caption: t("confirmed-chart-caption"),
    };
    let recovered = {
      id: "recovered",
      label: "Recovered",
      value: formatNumber(totals.recovered),
      diff: formatNumber(totalsDiff.recovered),
      chartName: "recovered_daily_avg.svg",
      caption: t("active-chart-caption"),
    };
    let deaths = {
      id: "deceased",
      label: "Deaths",
      value: formatNumber(totals.deceased),
      diff: formatNumber(totalsDiff.deceased),
      chartName: "deceased_daily_avg.svg",
      caption: t("recovered-chart-caption"),
    };

    let active = {
      id: "active",
      label: "Active",
      value: formatNumber(totals.active),
      diff: formatNumber(totalsDiff.active),
      chartName: "active_cumulative_avg.svg",
      caption: t("deceased-chart-caption"),
    };
    let tested = {
      id: "tested",
      label: "Tested",
      value: formatNumber(totals.tested),
      diff: formatNumber(totalsDiff.tested),
      chartName: "tested_daily_avg.svg",
      caption: t("tested-chart-caption"),
    };

    if (totals.active > 0) {
      let criticalPercentage = parseInt(
        (totals.critical / totals.active) * 100
      );
      if (criticalPercentage < 1) {
        criticalPercentage =
          parseInt((totals.critical / totals.active) * 1000) / 10;
      }
      active.percentage = t("active-critical-percentage", {
        percent: formatNumber(criticalPercentage),
      });
    }

    if (totals.confirmed > 0) {
      let recoveredPercent = parseInt(
        (totals.recovered / totals.confirmed) * 100
      );
      recovered.percentage = t("recovered-percentage", {
        percent: formatNumber(recoveredPercent),
      });
    }

    if (totals.confirmed > 0) {
      let deceasedPercent = parseInt(
        (totals.deceased / totals.confirmed) * 100
      );
      if (deceasedPercent < 1) {
        deceasedPercent =
          parseInt((totals.deceased / totals.confirmed) * 1000) / 10;
      }
      deaths.percentage = t("deceased-percentage", {
        percent: formatNumber(deceasedPercent),
      });
    }

    if (totals.tested > 0) {
      let testedPercentage = parseInt((totals.confirmed / totals.tested) * 100);
      if (testedPercentage < 1) {
        testedPercentage =
          parseInt((totals.confirmed / totals.tested) * 1000) / 10;
      }
      tested.percentage = t("tested-percentage", {
        percent: formatNumber(testedPercentage),
      });
    }

    setDrawData([confirmed, recovered, deaths, active, tested]);
  }, [data, language, t]);

  return (
    <section id="kpi">
      {/* {setDrawData.length > 0 &&
        drawData.map((chart) => (
          <Kpi
            key={chart.id}
            id={chart.id}
            label={chart.label}
            value={chart.value}
            diff={chart.diff}
            chartName={chart.chartName}
            percent={chart.percentage}
            caption={chart.caption}
          />
        ))} */}
      <div>{JSON.stringify(drawData)}</div>
    </section>
  );
};

KpiContainer.propTypes = {
  data: Proptypes.object,
};

KpiContainer.defaultProps = {
  data: {},
};

export default KpiContainer;